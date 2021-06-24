require 'rails_helper'

RSpec.describe User, :type => :model do
  subject { 
    described_class.new(:email => "test11@gmail.com", 
                        :password_digest => "Password123", 
                        :is_admin => false)  
  }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a password" do
      subject.password = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without an email" do
      subject.email = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without approved" do
      subject.is_admin = nil
      expect(subject).to_not be_valid
    end
  end
end
