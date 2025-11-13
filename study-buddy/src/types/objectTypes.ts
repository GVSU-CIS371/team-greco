export type UserType = {
  user_id: number; // Primary key
  name: string;
  email: string;
  major: string;
  availability: string;
};

export type CourseType = {
  course_id: string; // Primary key
  course_name: string;
  course_section: string;
};

export type StudyGroupType = {
  group_id: number; // Primary key
  course_id: number; // Foreign key -> Courses
  group_name: string;
  description: string;
  meeting_schedule: string;
};

export type MessageType = {
  message_id: number; // Primary key
  group_id: number; // Foreign key -> StudyGroups
  user_id: number; // Foreign key -> Users
  content: string;
  timestamp: string;
};
