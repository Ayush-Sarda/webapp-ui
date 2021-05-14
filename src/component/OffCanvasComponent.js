class OffCanvasComponent extends react.Component {
    componentWillMount() {
        this.setState({
            isMenuOpened: false
        });
    }

    render() {
        return (
            <OffCanvas
                width={300}
                transitionDuration={300}
                isMenuOpened={this.state.isMenuOpened}
                position={"right"}
                effect={"overlay"}
            >
                <OffCanvasBody
                    class={styles.bodyClass}
                    style={{ fontSize: "30px", backgroundColor: "red" }}
                >
                    <a href="#" onClick={this.handleClick.bind(this)}>Cart</a>
                </OffCanvasBody>
                <OffCanvasMenu class={styles.menuClass} style={{ backgroundColor: "red", height: "100%", overflowY: "scroll" }}>
                    <div class="row">
                        <button href="#" onClick={this.handleClick.bind(this)} class="btn-close ms-auto"></button>
                    </div>
                    <CartComponent />
                </OffCanvasMenu>
            </OffCanvas>
        );
    }

    handleClick() {
        // toggles the menu opened state
        this.setState({ isMenuOpened: !this.state.isMenuOpened });
    }
}

export default OffCanvasComponent