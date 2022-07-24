import { UserRecord } from "firebase-admin/lib/auth/user-record";

export interface UserInfo {
	username: string;
	pro: boolean;
	darkmode: boolean;
}

export default function getUser(record: UserRecord) {
	const user: UserInfo = {
		username: record.displayName as string,
		pro: false,
		darkmode: true,
	};
	return user;
}
