var account = new Account(100);

try
{
    account.Withdraw(30);
    account.Withdraw(500);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine($"Short by {ex.Shortfall}");
}

Console.WriteLine($"Balance: {account.Balance}");

class Account(decimal balance)
{
    public decimal Balance { get; private set; } = balance;

    public void Withdraw(decimal amount)
    {
        if (amount > Balance)
            throw new InsufficientFundsException(Balance, amount);

        Balance -= amount;
        Console.WriteLine($"Withdrew {amount}");
    }
}

class InsufficientFundsException(decimal balance, decimal amount)
    : Exception($"Cannot withdraw {amount}, balance is only {balance}.")
{
    public decimal Shortfall => amount - balance;
}
