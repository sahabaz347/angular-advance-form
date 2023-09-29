
export interface JsonFormData {
  controls: Control[]
  controlsGroup: ControlsGroup[]
}

export interface Control {
  name: string
  label: string
  value: string
  type: string
  option: Option[]
  validators: Validators
}

export interface Option {
  value: string
  viewValue: string
}

export interface Validators {
  required?: boolean
  minLength?: number
}

export interface ControlsGroup {
  name: string
  label: string
  value: string
  type: string
  option: any[]
  validators: Validators2
}

export interface Validators2 {
  required?: boolean
  minLength?: number
}