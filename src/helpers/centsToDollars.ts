export const centsToDollars = (cents: string) => {
    const dollars = Number(cents) / 100;
    const dollarsToShow = dollars.toLocaleString("en-US", {style: "currency", currency: "USD"});

    return dollarsToShow;
};
