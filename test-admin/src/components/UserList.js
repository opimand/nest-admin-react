import React from "react";
import {
    List,
    BooleanField,
    Datagrid,
    TextField,
    EditButton
} from "react-admin";
const UsersList = props => (
    <List {...props}>
        <Datagrid key={props.id}>
            <TextField source="given_name" />
            <TextField source="family_name" />
            <TextField source="email" />
            <BooleanField source="email_verified" />
            <BooleanField source="blocked" />
            <EditButton esource="users" />
        </Datagrid>
    </List>
);

export default UsersList;