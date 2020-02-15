class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    // this.balance = 0;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (const obj of this.transactions) {
      balance += obj.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.allowedTransaction()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    } else {
      console.log("Error: Transaction Not Allowed");
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  allowedTransaction() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return this.amount * -1;
  }
  allowedTransaction() {
    if (this.amount - this.value >= 0) {
      return true;
    } else {
      return false;
    }
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const richard = new Account("forgehe");

const t0 = new Deposit(100, richard);
t0.commit();
console.log("Transaction 0:", t0);

const t1 = new Withdrawal(50.25, richard);
t1.commit();
console.log("Transaction 1:", t1);

const t2 = new Withdrawal(9.99, richard);
t2.commit();
console.log("Transaction 2:", t2);

const t4 = new Deposit(19.99, richard);
t4.commit();
console.log("Transaction 4:", t4);

console.log("Balance:", richard.balance);
