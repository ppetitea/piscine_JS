
module.exports = {

    valid_inputs: function() {
        return [
            {
                index: 0,
                test: '1 + 1',
                result: 2
            },
            {
                index: 1,
                test: '1 / 1',
                result: 1
            },
            {
                index: 2,
                test: '1 - 1',
                result: 0
            },
            {
                index: 3,
                test: '1 % 1',
                result: 0
            },
            {
                index: 4,
                test: '1 * 1',
                result: 1
            },
            {
                index: 5,
                test: '2 + 2',
                result: 4
            },
            {
                index: 6,
                test: '2 / 2',
                result: 1
            },
            {
                index: 7,
                test: '2 - 2',
                result: 0
            },
            {
                index: 8,
                test: '2 % 2',
                result: 0
            },
            {
                index: 9,
                test: '2 * 2',
                result: 4
            },
            {
                index: 10,
                test: '-5--5-5*2--4*-4',
                result: -26
            },
            {
                index: 11,
                test: '(-5-(-5-(5*2))--4*-4)',
                result: -6
            },
            {
                index: 12,
                test: '10',
                result: 10
            },
            {
                index: 13,
                test: '42  % 42',
                result: 10
            }
        ];
    }

}