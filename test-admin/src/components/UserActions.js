import React from "react";
import { Create, Edit, SimpleForm, TextInput } from "react-admin";

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="password" type="password" />
            <TextInput source="given_name" />
            <TextInput source="family_name" />
        </SimpleForm>
    </Create>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="password" type="password" />
            <TextInput source="given_name" />
            <TextInput source="family_name" />
        </SimpleForm>
    </Edit>
);