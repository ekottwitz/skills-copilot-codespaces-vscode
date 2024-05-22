function skillsMember() {
  var member = document.getElementById("member");
  var skills = document.getElementById("skills");
  var memberPosition = member.getBoundingClientRect().top;
  var skillsPosition = skills.getBoundingClientRect().top;
  var screenPosition = window.innerHeight / 1.5;

  if (memberPosition < screenPosition) {
    member.style.opacity = "1";
    member.style.transform = "translateY(0)";
  }
  if (skillsPosition < screenPosition) {
    skills.style.opacity = "1";
    skills.style.transform = "translateY(0)";
  }
}