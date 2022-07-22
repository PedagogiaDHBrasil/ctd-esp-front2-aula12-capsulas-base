interface IFriends {
    name: string;
    status: 'online' | 'offline';
}

class FriendsManagement {
    list: IFriends[];

    constructor(friendsList: IFriends[]) {
        this.list = friendsList;
    }

    setStatus(name: string, status: 'online' | 'offline') {
        const userFind = this.list.find((user) => user.name === name);
        userFind.status = status;
    }
}

class User {
    name: string;
    friends: FriendsManagement;

    // O módulo superior requer o inferior
    constructor(name: string, friendsList: IFriends[]) {
        this.friends = new FriendsManagement(friendsList);
        this.name = name;
    }

    showFriends() {
        console.log(this.friends.list);
    }
}

const user1 = new User('Felipe', [
    { name: 'Iuri', status: 'online' },
    { name: 'Sergio', status: 'offline' },
]);
