interface IFriends {
    name: string;
    status: 'online' | 'offline';
}

// Interface de modo de abstração
interface IManagementFriends {
    list: IFriends[];
    setStatus: (name: string, status: 'online' | 'offline') => void;
}

class FriendsManagement implements IManagementFriends {
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
    friends: IManagementFriends;

    // Módulo refere-se à abstração e não ao módulo inferior
    constructor(name: string, friendsList: IManagementFriends) {
        this.friends = friendsList;
        this.name = name;
    }

    showFriends() {
        console.log(this.friends.list);
    }
}

const friends1 = new FriendsManagement([
    { name: 'Iuri', status: 'online' },
    { name: 'Sergio', status: 'offline' },
]);

const user1 = new User('Felipe', friends1);
