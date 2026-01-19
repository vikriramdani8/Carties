// use("SearchDB");
// db.Item.deleteMany({
//     "Seller": "Test"
// })

use("BidDb");
db.Auction.findOne({ "Seller": "bob" })