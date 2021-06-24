# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

jobs = ["Job_1", "Job_2", "Job_3"]

a = User.create(:email => 'UserA' + "@gmail.com", 
                :password_digest => "123", 
                :is_admin => false)

b = User.create(:email => 'UserB' + "@gmail.com", 
                :password_digest => "123", 
                :is_admin => false)

jobs.each{|job| Job.create(:identifier => job + "A",
                            :organisation_name => "Org A",
                            :description => "Test 123",
                            :location => "Test Location",
                            :start_date => Date.current,
                            :end_date => Date.current + 1.week,
                            :approved => false,
                            :created_at => DateTime.now,
                            :updated_at => DateTime.now,
                            :user_id => a.id)}

jobs.each{|job| Job.create(:identifier => job + "B",
                            :organisation_name => "Org B",
                            :description => "Test 123",
                            :location => "Test Location",
                            :start_date => Date.current,
                            :end_date => Date.current + 1.week,
                            :approved => false,
                            :created_at => DateTime.now,
                            :updated_at => DateTime.now,
                            :user_id => b.id)}