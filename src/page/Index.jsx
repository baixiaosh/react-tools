import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('test')
@observer //实时更新test
class Index extends Component {
    componentDidMount() {
        const { test } = this.props;
        console.log(this.props);
        test.add();
        console.log(test.count);
        console.log(test.getCount);
    }

    handleClick() {
        const { test } = this.props;
        test.add();
    }

    render() {
        const { test } = this.props;
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>按钮</button>
                <div>index</div>
                <div>{test.count}</div>
            </div>
        );
    }
}

export default Index;
