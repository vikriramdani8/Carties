using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Search Service Consuming bid placed");

        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);
        var currentHighBid = auction.CurrentHighBid ?? 0;

        if(context.Message.BidStatus.Contains("Accepted") && context.Message.Amount > currentHighBid)
        {
            auction.CurrentHighBid = context.Message.Amount;
            await auction.SaveAsync();
        }
    }
}