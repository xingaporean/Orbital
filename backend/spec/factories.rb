FactoryBot.define do

  factory :user, class: User do
    email { Faker::Lorem.word + Faker::Alphanumeric.alpha(number: 3) + "@test.com" }
    password_digest { Faker::Lorem.word }
    is_admin { Faker::Boolean.boolean }
  end
end

FactoryBot.define do

  factory :random_job, class: Job do
    association :user, factory: :user
    identifier { Faker::Lorem.word }
    organisation_name { Faker::Company.name }
    description { Faker::Lorem.paragraphs }
    location { Faker::Address.street_name }
    start_date { Date.today }
    end_date { Faker::Date.forward(days: 365) }
    approved { Faker::Boolean.boolean }
  end
end