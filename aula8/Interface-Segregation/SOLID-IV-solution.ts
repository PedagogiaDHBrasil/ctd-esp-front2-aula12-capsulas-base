interface ICreditCard {
    numbers: number;
    name: string;
    expiration_date: number;
    segurity_code: number;
}

interface IFriends {
    name: string;
    status: 'online' | 'offline';
}

type IFriendList = IFriends[];

class Console {
    user: string;
    ligado: boolean;
    friends: IFriendList;
    payments: ICreditCard;

    turnOn() {
        this.ligado = true;
    }
    turnOff() {
        this.ligado = false;
    }
}

class Playstation extends Console {
    addFriends(friendsList: IFriendList) {
        this.friends = friendsList;
    }
    addPayMethod(creditCard: ICreditCard) {
        this.payments = creditCard;
    }
}

class Nintendo extends Console {}

const PS4 = new Playstation();
const Nintendo64 = new Nintendo();
