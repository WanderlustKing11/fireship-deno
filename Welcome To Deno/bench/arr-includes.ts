function generateTestData(size: number) {
    // Generate userIds (e.g., "user_123")
    const userIds = Array.from(
        { length: size },
        (_, i) => `user_${(i + 1000).toString(36)}`
    );

    // Generate productsIds (e.g., "PROD-ABC123")
    const productIds = Array.from(
        { length: size },
        () => `PROD-${Math.random().toString(36).substring(2,8).toUpperCase()}`
    );

    // Generate emails (e.g., "user123@example.com")
    const emails = Array.from(
        { length: size },
        (_, i) => `user${i}@${['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'][i % 4]}`
    );

    return [...userIds, ...productIds, ...emails];
}

function generateLookupValues(data: any, lookupSize: number, hitRatio = 0.7) {
    const lookupValues = [];
    const hits = Math.floor(lookupSize + hitRatio);
    const misses = lookupSize - hits;

    for (let i = 0; i < hits; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        lookupValues.push(data[randomIndex]);
    }

    for (let i = 0; i < misses; i++) {
        lookupValues.push(`nonexistent_${Math.random().toString(36).substring(2,8)}`);
    }

    // Shuffle the array
    return lookupValues.sort(() => Math.random() - 0.5);
}

// Generate the data
const testData = generateTestData(100_000);
const lookupValues = generateLookupValues(testData, 10_000, 0.7);

// Create a Set for quicker lookups
const testSet = new Set(testData);

Deno.bench({
    name: "Array includes",
    baseline: true,
    fn: () => {
        for (const value of lookupValues) {
            testData.includes(value);
        }
    }
});

Deno.bench({
    name: "Set lookup",
    fn: () => {
        for (const value of lookupValues) {
            testSet.has(value)
        }
    }
});

