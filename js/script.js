document.addEventListener("DOMContentLoaded", function () {



  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }


    if (
      ["schoolerp.html", "jobportal.html", "learningapplication.html"].includes(currentPage) &&
      link.textContent.trim() === "Services"
    ) {
      link.classList.add("active");
    }
  });




  document.querySelectorAll(".dropdown").forEach(dropdown => {
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 768) {
        dropdown.querySelector(".dropdown-menu")?.classList.add("show");
      }
    });

    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth >= 768) {
        dropdown.querySelector(".dropdown-menu")?.classList.remove("show");
      }
    });
  });




  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }




  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const submitBtn = document.getElementById("submitBtn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || name.length < 2) return showToast("Invalid name", "error");
      if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        return showToast("Invalid email", "error");
      if (!message || message.length < 10)
        return showToast("Message too short", "error");

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast("Message sent successfully!", "success");
        form.reset();
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  function showToast(message, type) {
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast-custom toast-${type}`;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
  }




  document.querySelectorAll(".faq-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const body = btn.nextElementSibling;
      body.style.display = body.style.display === "block" ? "none" : "block";
    });
  });

});


function showToaster(message, type = "success", duration = 3000) {
  const toaster = document.getElementById("toaster");
  const toast = document.createElement("div");
  toast.className = `toaster-message ${type}`;
  toast.innerText = message;
  toaster.appendChild(toast);

  // Show animation
  setTimeout(() => toast.classList.add("show"), 50);

  // Hide after duration
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toaster.removeChild(toast), 500);
  }, duration);
}


document.addEventListener("DOMContentLoaded", () => {

  const joinModal = document.getElementById("joinModal");
  const joinButtons = document.querySelectorAll(".join-btn");
  const joinModalClose = document.getElementById("joinModalClose");
  const joinForm = document.getElementById("joinForm");
  const joinConfirm = document.getElementById("joinModalConfirm");

  // Open / Close Modal Logic (existing)
  function openJoinModal() { joinModal?.classList.add("show"); }
  function closeJoinModal() { joinModal?.classList.remove("show"); }

  joinButtons.forEach(btn => btn.addEventListener("click", openJoinModal));
  joinModalClose?.addEventListener("click", closeJoinModal);
  joinModal?.addEventListener("click", (e) => { if (e.target === joinModal) closeJoinModal(); });

  // ---------------------- Validation Logic ----------------------

  joinConfirm?.addEventListener("click", () => {
    let isValid = true;

    if (!/^[a-zA-Z ]+$/.test(fullName.value.trim())) {
      fullName.classList.add("invalid");
      showToaster("Full Name is required.", "error");
      isValid = false;
      return;
    } else { fullName.classList.remove("invalid"); }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add("invalid");
      showToaster("Please enter a valid Email.", "error");
      isValid = false;
      return;
    } else { email.classList.remove("invalid"); }

    if (!/^\d{10}$/.test(mobile.value.trim())) {
      mobile.classList.add("invalid");
      showToaster("Mobile Number must be 10 digits.", "error");
      isValid = false;
      return;
    } else { mobile.classList.remove("invalid"); }

    if (city.value.trim() === "") {
      city.classList.add("invalid");
      showToaster("City / Location is required.", "error");
      isValid = false;
      return;
    } else { city.classList.remove("invalid"); }

    if (role.value === "" || role.selectedIndex === 0) {
      role.classList.add("invalid");
      showToaster("Please select your Role / Identity.", "error");
      isValid = false;
      return;
    } else { role.classList.remove("invalid"); }

    if (interest.value === "" || interest.selectedIndex === 0) {
      interest.classList.add("invalid");
      showToaster("Please select your Area of Interest.", "error");
      isValid = false;
      return;
    } else { interest.classList.remove("invalid"); }

    if (skills.value === "" || skills.selectedIndex === 0) {
      skills.classList.add("invalid");
      showToaster("Please select at least one Skill / Expertise.", "error");
      isValid = false;
      return;
    } else { skills.classList.remove("invalid"); }

    if (isValid) {
      showToaster("Form submitted successfully!", "success");
      joinForm.reset();
      closeJoinModal();
    }
  });

  const fullName = document.getElementById("fullName");

  fullName.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
  });

  const mobile = document.getElementById("mobile");

  mobile.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });

  mobile.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
  });

  const city = document.getElementById("city");
  city.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z .-]/g, '');
  });


});