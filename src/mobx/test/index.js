import { observable, action, computed } from 'mobx';

class Test {
    @observable count = 0;
    get count() {
        return this.count * 2;
    }
    set count(value) {
        this.count = value;
    }

    @computed get getCount() {
        return this.count * 2;
    }
    @action add() {
        this.count = this.count + 1;
    }
}
export default new Test();
