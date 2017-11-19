import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class CameraSelectField extends Component {
    state = {
        deviceIds: [],
        currentId: null
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
                        currentId: prevState.currentId
                    }));
                }
            }
        });
    }
    handleChange(event, index, value) {
        this.setState(prevState => (
            {
                deviceIds: prevState.deviceIds,
                currentId: value
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
                this.state.deviceIds.map((id, i) => <MenuItem value={id} key={id} primaryText={`Camera ${i}`} />)
            }
            </SelectField>
        );
    }
}

export default CameraSelectField;
