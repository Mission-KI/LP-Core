export const calculateTemporalCover = (datasets) => {
    let earliest = null;
    let latest = null;

    datasets?.forEach(dataset => {
        dataset.columns.forEach(column => {
            if (column.earliest && column.latest) {
                const columnEarliest = new Date(column.earliest);
                const columnLatest = new Date(column.latest);

                if (!earliest || columnEarliest < earliest) {
                    earliest = columnEarliest;
                }

                if (!latest || columnLatest > latest) {
                    latest = columnLatest;
                }
            }
        });
    });

    if (earliest && latest) {
        const differenceInMonths = (latest.getFullYear() - earliest.getFullYear()) * 12 + (latest.getMonth() - earliest.getMonth());
        return `${differenceInMonths} months`;
    }

    return "unknown";
};

export const calculateTemporalConsistency = (datasets) => {
    let isConsistent = true;

    datasets?.forEach(dataset => {
        dataset.columns.forEach(column => {
            if (column.temporalConsistencies) {
                column.temporalConsistencies.forEach(consistency => {
                    if (!consistency.stable) {
                        isConsistent = false;
                    }
                });
            }
        });
    });

    return isConsistent ? "consistent" : "inconsistent";
};