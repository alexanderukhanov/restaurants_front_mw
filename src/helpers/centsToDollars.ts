export const centsToDollars = (cents: string | number) => {
    const dollars = Number(cents) / 100;
    const dollarsToShow = dollars.toLocaleString("en-US", {style: "currency", currency: "USD"});

    return dollarsToShow;
};
