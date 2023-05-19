export default function createTransfer({
  fromAccount,
  toAccount,
  transferAmount,
  note,
}) {
  return {
    fromAccount: fromAccount,
    toAccount: toAccount,
    transferAmount: transferAmount,
    note: note,
  };
}
