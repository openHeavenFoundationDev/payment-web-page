interface NameParts {
  firstName: string;
  lastName: string;
}

export default function splitName(fullName: string): NameParts {
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
  return {
    firstName,
    lastName,
  };
}

// const fullName = "Valdryan Ivandito";
// const { firstName, lastName } = splitName(fullName);

// console.log("First Name:", firstName); // Output: "Valdryan"
// console.log("Last Name:", lastName); // Output: "Ivandito"
