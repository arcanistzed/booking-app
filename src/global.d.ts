import { Component } from "react";

declare module "react-datetime-picker/dist/entry.nostyle" {
    export default class DateTimePicker extends Component<
        unknown,
        unknown
    > { }
}
