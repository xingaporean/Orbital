class User < ApplicationRecord
  has_many :jobs
  has_secure_password
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_inclusion_of :is_admin, in: [true, false]
end
