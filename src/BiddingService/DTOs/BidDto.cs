using System.ComponentModel.DataAnnotations;

namespace BiddingService.DTOs;

public class BidDto
{
    public required string Id { get; set; }
    public required string AuctionId { get; set; }
    public string? Bidder { get; set; }
    public DateTime BidTime { get; set; }
    public int Amount { get; set; }
    public string? BidStatus { get; set; }
}