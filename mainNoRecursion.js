let arr = [-1, -1, -1, -1, -1, -1, -1, -1];

let eightQeens = (arr) => {
    let i = 0;
    while (i > -1 && i < 8) {
        arr[i]++;
        let j = 0;
        while (j < i && arr[i] < 8) {
            if (arr[i] == arr[j] || Math.abs(arr[i] - arr[j]) == i - j) {
                // movie queen one position and start to compare again
                arr[i]++;
                j = 0;
                continue;
            }
            //dont movie queen, but continue to compare to another column
            j++;
        }
        if (arr[i] == 8) {
            i--;
        } else {
            i++;
            arr[i] = -1;
            if (i == 8) {
                arr.pop();
                console.log(arr);
                count++;
                i--;
            }
        }
    }
    console.log('total deals: ' + count);
}

let count = 0;
debugger
eightQeens(arr);
