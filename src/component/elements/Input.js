import React from 'react'
import '../../css/Input.scss'

export default class Input extends React.Component {


    render() {
        return (
            <div class='mt-0'>
                {
                    this.props.params.type === 'textarea' ?
                        <div class="rdf__group field col-12 px-2">
                            <label for={this.props.params.name} class={`rdf__label`}>{this.props.params.name}</label>
                            <textarea class="rdf__field" id={this.props.params.name} name={this.props.params.name} value={this.props.params.value} required={this.props.params.required} onChange={(event) => this.props.handleChange(event)}></textarea>
                            <div class="invalid-feedback">
                                {this.props.params.invalidMessage}
                            </div>
                        </div>
                        :
                        this.props.params.type === 'select' ?
                            <div class="rdf__group field col-12 px-2">
                                <label for={this.props.params.name} class="rdf__label" >{this.props.params.name} {this.props.params.name === 'gst' ? '(in %)' : ''}</label>
                                <select class="rdf__field" id={this.props.params.name} name={this.props.params.name} required={this.props.params.required} onChange={(event) => this.props.handleChange(event)}>
                                    {this.props.params.options.map(option => (
                                        <option selected={this.props.params.value === (option === 'Choose...' ? "" : option) ? 'selected' : ''} value={option === 'Choose...' ? "" : null}>{option}</option>
                                    ))}
                                </select>
                                <div class="invalid-feedback">
                                    {this.props.params.invalidMessage}
                                </div>
                            </div>
                            :
                            <div class="rdf__group field col-12 px-2">
                                <input type={this.props.params.type} class="rdf__field" value={this.props.params.value} placeholder={this.props.params.name} name={this.props.params.name} required={this.props.params.required} onChange={(event) => this.props.handleChange(event)} />
                                <label for={this.props.params.name} class="rdf__label">{this.props.params.name}</label>
                                <div class="invalid-feedback">
                                    {this.props.params.invalidMessage}
                                </div>
                            </div>
                }
            </div>
        )
    }
}