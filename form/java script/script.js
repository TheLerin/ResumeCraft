
        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Photo Upload Preview
        const photoUpload = document.getElementById('photoUpload');
        const photoPreview = document.getElementById('photoPreview');
        const previewImage = document.getElementById('previewImage');
        
        photoUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.addEventListener('load', function() {
                    previewImage.src = reader.result;
                    previewImage.style.display = 'block';
                    photoPreview.querySelector('i').style.display = 'none';
                });
                
                reader.readAsDataURL(file);
            }
        });
        
       const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        

        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            mobileToggle.innerHTML = navMenu.classList.contains('show') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Step Navigation
        function navigateToStep(step) {
            // Hide all steps
            document.querySelectorAll('.form-container').forEach(el => {
                el.style.display = 'none';
            });
            
            // Show current step
            document.getElementById('step' + step).style.display = 'block';
            
            // Update step indicators
            document.querySelectorAll('.step-item').forEach(item => {
                item.classList.remove('active', 'completed');
                
                const stepNum = parseInt(item.dataset.step);
                if (stepNum === step) {
                    item.classList.add('active');
                } else if (stepNum < step) {
                    item.classList.add('completed');
                }
            });
        }

        // Education Repeater
        let educationCount = 1;
        
        function addEducation() {
            educationCount++;
            const container = document.getElementById('educationContainer');
            const newEducation = document.createElement('div');
            newEducation.className = 'repeater-section';
            newEducation.innerHTML = `
                <button class="remove-btn" onclick="removeEducation(this)"><i class="fas fa-times"></i></button>
                <div class="form-section">
                    <h3 class="form-section-title">Education #${educationCount}</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="degree${educationCount}">Degree/Certificate <span class="optional">*</span></label>
                            <input type="text" id="degree${educationCount}" placeholder="Bachelor of Science in Computer Science" required>
                        </div>
                        <div class="form-group">
                            <label for="school${educationCount}">School/University <span class="optional">*</span></label>
                            <input type="text" id="school${educationCount}" placeholder="University of Technology" required>
                        </div>
                        <div class="form-group">
                            <label for="location${educationCount}">Location <span class="optional">(Optional)</span></label>
                            <input type="text" id="location${educationCount}" placeholder="New York, USA">
                        </div>
                        <div class="form-group">
                            <label for="eduStartDate${educationCount}">Start Date <span class="optional">*</span></label>
                            <input type="month" id="eduStartDate${educationCount}" required>
                        </div>
                        <div class="form-group">
                            <label for="eduEndDate${educationCount}">End Date (or Expected) <span class="optional">*</span></label>
                            <input type="month" id="eduEndDate${educationCount}" required>
                        </div>
                        <div class="form-group">
                            <label for="gpa${educationCount}">GPA/Score <span class="optional">(Optional)</span></label>
                            <input type="text" id="gpa${educationCount}" placeholder="3.8/4.0">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="description${educationCount}">Description <span class="optional">(Optional)</span></label>
                        <textarea id="description${educationCount}" rows="3" placeholder="Relevant coursework, achievements, honors..."></textarea>
                    </div>
                </div>
            `;
            container.appendChild(newEducation);
        }
        
        function removeEducation(button) {
            if (educationCount > 1) {
                button.parentElement.remove();
                educationCount--;
            } else {
                alert("You need at least one education entry.");
            }
        }

        // Experience Repeater
        let experienceCount = 1;
        
        function addExperience() {
            experienceCount++;
            const container = document.getElementById('experienceContainer');
            const newExperience = document.createElement('div');
            newExperience.className = 'repeater-section';
            newExperience.innerHTML = `
                <button class="remove-btn" onclick="removeExperience(this)"><i class="fas fa-times"></i></button>
                <div class="form-section">
                    <h3 class="form-section-title">Experience #${experienceCount}</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="jobTitle${experienceCount}">Job Title <span class="optional">*</span></label>
                            <input type="text" id="jobTitle${experienceCount}" placeholder="Software Engineer" required>
                        </div>
                        <div class="form-group">
                            <label for="company${experienceCount}">Company <span class="optional">*</span></label>
                            <input type="text" id="company${experienceCount}" placeholder="Tech Innovations Inc." required>
                        </div>
                        <div class="form-group">
                            <label for="location${experienceCount}">Location <span class="optional">(Optional)</span></label>
                            <input type="text" id="location${experienceCount}" placeholder="San Francisco, CA">
                        </div>
                        <div class="form-group">
                            <label for="expStartDate${experienceCount}">Start Date <span class="optional">*</span></label>
                            <input type="month" id="expStartDate${experienceCount}" required>
                        </div>
                        <div class="form-group">
                            <label for="expEndDate${experienceCount}">End Date <span class="optional">(Leave blank if current)</span></label>
                            <input type="month" id="expEndDate${experienceCount}">
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="currentJob${experienceCount}"> I currently work here
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="jobDescription${experienceCount}">Job Description <span class="optional">*</span></label>
                        <textarea id="jobDescription${experienceCount}" rows="4" placeholder="Describe your responsibilities and achievements..." required></textarea>
                    </div>
                </div>
            `;
            container.appendChild(newExperience);
        }
        
        function removeExperience(button) {
            if (experienceCount > 1) {
                button.parentElement.remove();
                experienceCount--;
            } else {
                alert("You need at least one work experience entry.");
            }
        }

        // Initialize form with step 1
        navigateToStep(1);

        // Certification Repeater
let certificationCount = 1;

function addCertification() {
    certificationCount++;
    const container = document.getElementById('certificationsContainer');
    const newCert = document.createElement('div');
    newCert.className = 'repeater-section';
    newCert.innerHTML = `
        <button class="remove-btn" onclick="removeCertification(this)"><i class="fas fa-times"></i></button>
        <div class="form-section">
            <h3 class="form-section-title">Certification #${certificationCount}</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label for="certName${certificationCount}">Certification Name <span class="optional">*</span></label>
                    <input type="text" id="certName${certificationCount}" placeholder="AWS Certified Solutions Architect" required>
                </div>
                <div class="form-group">
                    <label for="issuingOrg${certificationCount}">Issuing Organization <span class="optional">*</span></label>
                    <input type="text" id="issuingOrg${certificationCount}" placeholder="Amazon Web Services" required>
                </div>
                <div class="form-group">
                    <label for="certDate${certificationCount}">Date Issued <span class="optional">*</span></label>
                    <input type="month" id="certDate${certificationCount}" required>
                </div>
                <div class="form-group">
                    <label for="expirationDate${certificationCount}">Expiration Date <span class="optional">(If applicable)</span></label>
                    <input type="month" id="expirationDate${certificationCount}">
                </div>
                <div class="form-group">
                    <label for="credentialID${certificationCount}">Credential ID <span class="optional">(Optional)</span></label>
                    <input type="text" id="credentialID${certificationCount}" placeholder="License number">
                </div>
                <div class="form-group">
                    <label for="certUrl${certificationCount}">Credential URL <span class="optional">(Optional)</span></label>
                    <input type="url" id="certUrl${certificationCount}" placeholder="https://example.com/verify">
                </div>
            </div>
        </div>
    `;
    container.appendChild(newCert);
}

function removeCertification(button) {
    if (certificationCount > 1) {
        button.parentElement.remove();
        certificationCount--;
    } else {
        alert("You need at least one certification entry.");
    }
}

// Language Repeater
let languageCount = 1;

function addLanguage() {
    languageCount++;
    const container = document.getElementById('languagesContainer');
    const newLang = document.createElement('div');
    newLang.className = 'form-grid';
    newLang.innerHTML = `
        <div class="form-group">
            <label for="language${languageCount}">Language <span class="optional">*</span></label>
            <input type="text" id="language${languageCount}" placeholder="Spanish" required>
        </div>
        <div class="form-group">
            <label for="proficiency${languageCount}">Proficiency Level <span class="optional">*</span></label>
            <select id="proficiency${languageCount}" required>
                <option value="">Select Level</option>
                <option value="native">Native</option>
                <option value="fluent">Fluent</option>
                <option value="advanced">Advanced</option>
                <option value="intermediate">Intermediate</option>
                <option value="basic">Basic</option>
            </select>
        </div>
    `;
    container.appendChild(newLang);
}

// Achievement Repeater
let achievementCount = 1;

function addAchievement() {
    achievementCount++;
    const container = document.getElementById('achievementsContainer');
    const newAchievement = document.createElement('div');
    newAchievement.className = 'form-group';
    newAchievement.innerHTML = `
        <label>Achievement #${achievementCount} <span class="optional">*</span></label>
        <input type="text" placeholder="Reduced costs by 15% by implementing..." required>
    `;
    container.appendChild(newAchievement);
}

// Reference Repeater
let referenceCount = 1;

function addReference() {
    referenceCount++;
    const container = document.getElementById('referencesContainer');
    const newRef = document.createElement('div');
    newRef.className = 'repeater-section';
    newRef.innerHTML = `
        <button class="remove-btn" onclick="removeReference(this)"><i class="fas fa-times"></i></button>
        <div class="form-section">
            <h3 class="form-section-title">Reference #${referenceCount}</h3>
            <div class="form-grid">
                <div class="form-group">
                    <label for="refName${referenceCount}">Full Name <span class="optional">*</span></label>
                    <input type="text" id="refName${referenceCount}" placeholder="Jane Smith" required>
                </div>
                <div class="form-group">
                    <label for="refTitle${referenceCount}">Job Title <span class="optional">*</span></label>
                    <input type="text" id="refTitle${referenceCount}" placeholder="Senior Manager" required>
                </div>
                <div class="form-group">
                    <label for="refCompany${referenceCount}">Company <span class="optional">*</span></label>
                    <input type="text" id="refCompany${referenceCount}" placeholder="ABC Corporation" required>
                </div>
                <div class="form-group">
                    <label for="refRelationship${referenceCount}">Relationship <span class="optional">*</span></label>
                    <input type="text" id="refRelationship${referenceCount}" placeholder="Former Manager" required>
                </div>
                <div class="form-group">
                    <label for="refEmail${referenceCount}">Email <span class="optional">*</span></label>
                    <input type="email" id="refEmail${referenceCount}" placeholder="j.smith@company.com" required>
                </div>
                <div class="form-group">
                    <label for="refPhone${referenceCount}">Phone <span class="optional">(Optional)</span></label>
                    <input type="tel" id="refPhone${referenceCount}" placeholder="+1 (123) 456-7890">
                </div>
            </div>
        </div>
    `;
    container.appendChild(newRef);
}

function removeReference(button) {
    if (referenceCount > 1) {
        button.parentElement.remove();
        referenceCount--;
    } else {
        alert("You need at least one reference entry.");
    }
}


function generateResumePDF() {
    // Personal info
    const name = document.getElementById('fullName').value || "Your Name";
    const email = document.getElementById('email').value || "you@example.com";
    const summary = document.getElementById('summary').value || "Summary goes here...";

    // Fill PDF HTML
    document.getElementById('pdfName').innerText = name;
    document.getElementById('pdfEmail').innerText = email;
    document.getElementById('pdfSummary').innerText = summary;

    // Education
    const eduContainer = document.getElementById('pdfEducation');
    eduContainer.innerHTML = '';
    const educationSections = document.querySelectorAll('#educationContainer .repeater-section');
    educationSections.forEach((section, index) => {
        const degree = section.querySelector(`#degree${index + 1}`).value;
        const school = section.querySelector(`#school${index + 1}`).value;
        const start = section.querySelector(`#eduStartDate${index + 1}`).value;
        const end = section.querySelector(`#eduEndDate${index + 1}`).value;
        eduContainer.innerHTML += `<p><strong>${degree}</strong> at ${school} (${start} - ${end})</p>`;
    });

    // Experience
    const expContainer = document.getElementById('pdfExperience');
    expContainer.innerHTML = '';
    const experienceSections = document.querySelectorAll('#experienceContainer .repeater-section');
    experienceSections.forEach((section, index) => {
        const title = section.querySelector(`#jobTitle${index + 1}`).value;
        const company = section.querySelector(`#company${index + 1}`).value;
        const start = section.querySelector(`#expStartDate${index + 1}`).value;
        const end = section.querySelector(`#expEndDate${index + 1}`).value || 'Present';
        const desc = section.querySelector(`#jobDescription${index + 1}`).value;
        expContainer.innerHTML += `<p><strong>${title}</strong> at ${company} (${start} - ${end})<br>${desc}</p>`;
    });

    // Generate PDF
    const element = document.getElementById('pdfTemplate');
    element.style.display = 'block'; // Show temporarily
    html2pdf().from(element).save(`${name}_Resume.pdf`);
    element.style.display = 'none'; // Hide after generation
}



// ai made logo
 type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "url": "https://yourwebsite.com",
  "logo": "https://yourwebsite.com/logo.svg"
}

