import Text "mo:core/Text";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type ContactFormEntry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactFormEntry {
    public func compare(a : ContactFormEntry, b : ContactFormEntry) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let formEntries = Map.empty<Time.Time, ContactFormEntry>();

  public shared ({ caller }) func submitForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    if (name == "" or email == "" or phone == "" or message == "") {
      Runtime.trap("Sheriff's Office: All fields must be provided to submit a contact request!");
    };

    let formEntry : ContactFormEntry = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };

    formEntries.add(formEntry.timestamp, formEntry);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactFormEntry] {
    formEntries.values().toArray().sort();
  };
};
