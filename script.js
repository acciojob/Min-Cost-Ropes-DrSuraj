class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Utility function to swap two elements in the heap
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // Heapify up operation
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] > this.heap[index]) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Heapify down operation
    heapifyDown(index) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
            smallest = leftChild;
        }

        if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
            smallest = rightChild;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    // Insert an element into the heap
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    // Extract the minimum element from the heap
    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const minValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);

        return minValue;
    }
}

function mincost(arr) {
    const minHeap = new MinHeap();

    // Insert all ropes into the min heap
    for (const rope of arr) {
        minHeap.insert(rope);
    }

    let totalCost = 0;

    // Combine the two smallest ropes until there is only one rope left
    while (minHeap.heap.length > 1) {
        const firstMin = minHeap.extractMin();
        const secondMin = minHeap.extractMin();

        const currentCost = firstMin + secondMin;
        totalCost += currentCost;

        minHeap.insert(currentCost);
    }

    return totalCost;
}

// Examples
console.log(mincost([4, 3, 2, 6]));    // 29
console.log(mincost([1, 2, 3, 4, 5])); // 33
