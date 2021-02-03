CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "email" varchar,
  "password" varchar,
  "active" boolean,
  "source" varchar,
  "avatarUrl" varchar,
  "user_type" varchar
);

CREATE TABLE "course" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "desicription" varchar,
  "created_by" int NOT NULL,
  "price" int,
  "active" varchar
);

CREATE TABLE "lesson" (
  "id" int PRIMARY KEY,
  "course_id" id,
  "name" varchar,
  "desicription" varchar,
  "addes_by" int NOT NULL,
  "active" varchar
);

CREATE TABLE "purchase" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "course_id" id,
  "amount" int
);

CREATE TABLE "coupon" (
  "id" SERIAL PRIMARY KEY,
  "addes_by" int,
  "course_id" id,
  "discount" int,
  "owner" varchar
);

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "course" ("created_by");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "lesson" ("addes_by");

ALTER TABLE "course" ADD FOREIGN KEY ("id") REFERENCES "lesson" ("course_id");

ALTER TABLE "course" ADD FOREIGN KEY ("id") REFERENCES "coupon" ("course_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "coupon" ("addes_by");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "purchase" ("user_id");

ALTER TABLE "course" ADD FOREIGN KEY ("id") REFERENCES "purchase" ("course_id");
