from iaa import IntervalAgreementApproach


intervals = [[1, 7], [2, 6], [2, 4], [6, 9]]


def generate_iaa(data):
    """Create a type-1 interval agreement approach set from interval data."""
    fs = IntervalAgreementApproach()
    for d in data:
        fs.add_interval(d)
    return fs


fs = generate_iaa(intervals)
print(fs.calculate_membership(1))  # equals 0.25
print(fs.calculate_membership(2))  # equals 0.75
print(fs.calculate_membership(7))  # equals 0.5
print(fs.calculate_centroid())  # equals ~4.57
