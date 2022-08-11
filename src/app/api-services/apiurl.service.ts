import { environment } from '../../environments/environment';

export const APIURL = {
    CHECK_SEVER_STATUS: environment.apiUrl + '/server',
    APPLY_LEAVE: environment.apiUrl + '/apply_leave',
    GET_NOTIFICATIONS: environment.apiUrl + '/getNotifications',

    // Admin authentication & authorization API URL's
    ADMIN_LOGIN: environment.apiUrl + '/admin_login',
    ADMIN_RESIGNIN: environment.apiUrl + '/reSignIn/admin',

    // Admin Dashboard API URL's
    GET_ADMIN_DASHBOARD_COUNTS: environment.apiUrl + '/get_admin_dashboard_counts',

    // Employee API URL's
    ADD_UPDATE_SINGLE_EMPLOYEE_DATA: environment.apiUrl + '/add_update_single_employee',
    GET_EMPLOYEES_DATA: environment.apiUrl + '/get_employees_data',
    GET_ALL_DEPARTMENTS_DATA: environment.apiUrl + '/get_all_departments_data',
    GET_EMPLOYEE_DATA_BY_ID: environment.apiUrl + '/get_employee_by_id',
    UPDATE_EMPLOYEE_STATUS: environment.apiUrl + '/update_employee_status',
    GENERATED_PASSWORD_TO_EMPLOYEE: environment.apiUrl + '/generate_password',

    // Department API URL's
    ADD_UPDATE_DEPARTMENT_DATA: environment.apiUrl + '/add_update_department',
    GET_DEPARTMENTS_DATA: environment.apiUrl + '/get_departments_data',
    GET_DEPARTMENT_DATA_BY_ID: environment.apiUrl + '/get_department_by_id',
    UPDATE_DEPARTMENT_STATUS: environment.apiUrl + '/update_department_status',

    // Leavetype API URL's
    ADD_UPDATE_LEAVETYPE_DATA: environment.apiUrl + '/add_update_leavetype',
    GET_LEAVETYPES_DATA: environment.apiUrl + '/get_leavetypes_data',
    GET_LEAVETYPE_DATA_BY_ID: environment.apiUrl + '/get_leavetype_by_id',
    UPDATE_LEAVETYPE_STATUS: environment.apiUrl + '/update_leavetype_status',

    // Employee authentication & authorization API URL's
    EMPLOYEE_LOGIN: environment.apiUrl + '/login',
    EMPLOYEE_SIGNUP: environment.apiUrl + '/signup',
    EMPLOYEE_RESIGNIN: environment.apiUrl + '/reSignIn',

    // Employee Leave Management API URL's
    GET_EMPLOYEE_LEAVETYPES_DATA: environment.apiUrl + '/get_employee_leavetypes',
    ADD_UPDATE_EMPLOYEE_LEAVE_APPLIED_DATA: environment.apiUrl + '/add_update_applied_leave_data',
    GET_EMPLOYEE_ALL_LEAVE_HISTORY_DATA: environment.apiUrl + '/get_employee_all_leave_history',
    GET_EMPLOYEE_LEAVE_HISTORY_DATA_BY_ID: environment.apiUrl + '/get_employee_leave_history_by_id',
    CANCEL_LEAVE_REQUEST_TO_EMPLOYEE: environment.apiUrl + '/cancel_leave_request',

    // Employee profile update API URL's
    UPDATE_NEW_PASSWORD_TO_EMPLOYEE: environment.apiUrl + '/employee_change_password',
    GET_EMPLOYEE_PROFILE_DATA: environment.apiUrl + '/get_employee_profile_data',
    UPDATE_EMPLOYEE_PROFILE_DATA: environment.apiUrl + '/update_employee_profile_data',
};
