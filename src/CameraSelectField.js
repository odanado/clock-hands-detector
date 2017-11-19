import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class CameraSelectField extends Component {
    state = {
        deviceIds: [],
        deviceLabels: [],
        currentId: null,
        currentLabel: null
    }
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);

        this.acquireCameraDeviceIds();
    }

    acquireCameraDeviceIds() {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            for (let i = 0; i < devices.length; i++) {
                let device = devices[i];
                if (device.kind === 'videoinput') {
                    this.setState(prevState => ({
                        deviceIds: [...prevState.deviceIds, device.deviceId],
                        deviceLabels: [...prevState.deviceLabels, device.label],
                        currentId: prevState.currentId,
                        currentLabel: prevState.currentLabel
                    }));
                }
            }
        });
    }
    handleChange(event, idx, value) {
        this.setState(prevState => (
            {
                deviceIds: prevState.deviceIds,
                deviceLabels: prevState.deviceLabels,
                currentId: this.state.deviceIds[idx],
                currentLabel: this.state.deviceLabels[idx]
            }
        ));
        this.props.handleChange();
    }

    render() {
        return (
            <SelectField
                floatingLabelText="camera"
                id="cameraSelectField"
                ref="cameraSelectField"
                value={this.state.currentId}
                onChange={this.handleChange}>
            {
                this.state.deviceIds.map((id, i) => <MenuItem value={id} key={id} primaryText={this.state.deviceLabels[i]} />)
            }
            </SelectField>
        );
    }
}

export default CameraSelectField;
