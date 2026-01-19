using BiddingService.Models;
using Contracts;
using MassTransit;
using MassTransit.Testing;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Entities;

namespace BiddingService.Services;

public class CheckAuctionFinished : BackgroundService
{
    private readonly ILogger<CheckAuctionFinished> _logger;
    private readonly IServiceProvider _service;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider service)
    {
        _logger = logger;
        _service = service;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("CheckAuctionFinished is starting.");
        Console.WriteLine("CheckAuctionFinished is starting.");

        stoppingToken.Register(() =>
            _logger.LogInformation("CheckAuctionFinished background task is stopping."));

        while (!stoppingToken.IsCancellationRequested)
        {
            await CheckAuctions(stoppingToken);
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken); // Example delay
        }

        _logger.LogInformation("CheckAuctionFinished background task is stopped.");
        Console.WriteLine("CheckAuctionFinished background task is stopped.");
    }

    private async Task CheckAuctions(CancellationToken stoppingToken)
    {
        var finishedAuction = await DB.Find<Auction>()
                                    .Match(x => x.AuctionEnd <= DateTime.UtcNow)
                                    .Match(x => !x.Finished)
                                    .ExecuteAsync(stoppingToken);
        
        if (finishedAuction.Count == 0) return;

        _logger.LogInformation("==> {count} auctions that have completed", finishedAuction.Count);
        _logger.LogInformation("CheckAuctionFinished task doing work at: {time}", DateTimeOffset.Now);

        Console.WriteLine($"==> {finishedAuction.Count} auctions that have completed");
        Console.WriteLine($"CheckAuctionFinished task doing work at: {DateTimeOffset.Now}");

        using var scope = _service.CreateScope();
        var endPoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();

        foreach (var auction in finishedAuction)
        {
            auction.Finished = true;
            await auction.SaveAsync(null, stoppingToken);

            var winningBid = await DB.Find<Bid>()
                                    .Match(a => a.AuctionId == auction.ID)
                                    .Match(b => b.BidStatus == BidStatus.Accepted)
                                    .Sort(x => x.Descending(s => s.Amount))
                                    .ExecuteFirstAsync(stoppingToken);
            
            await endPoint.Publish(new AuctionFinished
            {
               ItemSold = winningBid != null,
               AuctionId = auction.ID,
               Winner = winningBid?.Bidder,
               Amount = winningBid?.Amount ?? 0,
               Seller = auction.Seller
            });
        }
    }
}