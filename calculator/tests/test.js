
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
            }
        ];
    }

}