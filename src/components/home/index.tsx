import { Button, Input, StyledComponentProps, withStyles } from '@material-ui/core'
import { push } from 'connected-react-router'
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { bindActionCreators, Dispatch } from 'redux'
import { IState } from '../../redux'
import {
    decrement,
    decrementAsync,
    increment,
    incrementAsync,
    setName
} from '../../redux/counter'

const styles = (): any => ({
    button: {
        border: 'solid 1px #000000',
        marginRight: '8px'
    },
    buttons: {
        paddingBottom: '16px'
    },
    input: {
        marginRight: '8px'
    }
})

interface IComponentState {
    name: string
}

class Home extends React.Component<TComponentProps, IComponentState> {
    state: IComponentState

    constructor(props: TComponentProps) {
        super(props)
        this.state = {
            name: props.name
        }
    }

    onChangeName = (event: any) => {
        this.setState({ name: event.target.value })
    }

    submitName = () => {
        this.props.setNameDispatch(this.state.name)
        this.changePage()
    }

    changePage = () => {
        this.props.changePage()
    }

    render() {
        const {
            count, incrementDispatch,
            incrementAsyncDispatch,
            decrementDispatch,
            decrementAsyncDispatch,
            isIncrementing,
            isDecrementing,
            classes
        } = this.props
        const {
            name
        } = this.state

        if (classes === undefined) {
            return null
        }

        return (
            <div>
                <h1>Home</h1>
                <p>Count: {count}</p>

                <div className={classes.buttons}>
                    <Button onClick={incrementDispatch} className={classes.button}>Increment</Button>
                    <Button onClick={incrementAsyncDispatch} className={classes.button} disabled={isIncrementing}>
                        Increment Async
                    </Button>
                </div>

                <div className={classes.buttons}>
                    <Button onClick={decrementDispatch} className={classes.button}>Decrement</Button>
                    <Button onClick={decrementAsyncDispatch} className={classes.button} disabled={isDecrementing}>
                        Decrement Async
                    </Button>
                </div>

                <div>
                    <Input value={name} onChange={this.onChangeName} className={classes.input} />
                    <Button onClick={this.submitName} className={classes.button}>
                        Submit Name
                    </Button>
                </div>
            </div>
        )
    }
}

interface IStateToProps {
    count: number
    isIncrementing: boolean
    isDecrementing: boolean
    name: string
}

const mapStateToProps = ({ counter }: IState): IStateToProps => ({
    count: counter.count,
    isIncrementing: counter.isIncrementing,
    isDecrementing: counter.isDecrementing,
    name: counter.name
})

interface IDispatchToProps {
    incrementDispatch: () => void
    incrementAsyncDispatch: () => void
    decrementDispatch: () => void
    decrementAsyncDispatch: () => void
    setNameDispatch: (name: string) => void
    changePage: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
    return bindActionCreators({
        incrementDispatch: increment,
        incrementAsyncDispatch: incrementAsync,
        decrementDispatch: decrement,
        decrementAsyncDispatch: decrementAsync,
        setNameDispatch: setName,
        changePage: () => push('/about-us')
    }, dispatch)
}
    

type TComponentProps = RouteComponentProps<any> & StyledComponentProps & IStateToProps & IDispatchToProps

export default withStyles(styles)(connect<IStateToProps, IDispatchToProps, any>(
    mapStateToProps,
    mapDispatchToProps
)(Home))
