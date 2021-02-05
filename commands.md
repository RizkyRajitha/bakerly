sudo -u postgres psql
create database backerly;
create user backerly with encrypted password '123';
grant all privileges on database backerly to backerly;