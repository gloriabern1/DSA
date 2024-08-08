
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

 

Example 1:

Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:

Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    //using dummynode, so we can alway return the next as the modified list
 let dummyNode= new ListNode(0, head);
 //points to the node before the start of a new group
 let groupprev= dummyNode;
//using bool because the base codition to break is within the loop
//We can also use a counter for the length of the list
 while(true){
    //get the last node of the group to be reversed
    let kth= getKth(groupprev, k);
    //console.log('kth', kth);
    //if a valid last node is not returned, then we don't need to reverset he remaining nodes in the list
    if(!kth) break;
    //Normal list reversal from one point to another
    //get the first node of the next group to be reversed
    groupNext= kth.next;
    //set prev to k.next instead of null because the first node in the group should point to the first node in the next group after reversal
    // 1->2->3-4 to 2->1->3->4 where 1 now points to 3
    prev= kth.next;
    //curr is groupprev.next because groupprev is always the node behind the first node of the current group
    curr= groupprev.next;
    //basic reversal from curr to before the next group
    while(curr != groupNext){
        temp= curr.next;
        curr.next=prev;
        prev=curr;
        curr=temp;
    }
//pointer for the first node of the current group;
//Because this first node of the current group now points to the
// first node of the next group
//groupprev= 0->1->3->4 , tail= 1->3-4
    tail= groupprev.next;

    groupprev.next= kth;
    groupprev= tail;
 }

 return dummyNode.next;
};

function getKth(curr, k) {
    while (k > 0 && curr) {
    curr=curr.next;
    --k;
    }
    return curr;
}