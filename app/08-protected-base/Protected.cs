var customer = new GoldCustomer();
customer.OfferVoucher();

class Customer
{
    protected int CalculateRating()
    {
        return 5;
    }
}

class GoldCustomer : Customer
{
    public void OfferVoucher()
    {
        var rating = CalculateRating();
        Console.WriteLine($"Rating {rating}: voucher sent.");
    }
}
