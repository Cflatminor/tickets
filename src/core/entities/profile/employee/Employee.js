import Profile from "app/core/entities/profile/Profile";
import Company from "app/core/entities/company/Company";

class Employee extends Profile {
    /**
     * @method getQualifications
     * @returns {Array}
     */
    getQualifications() {
        return (this.entity.qualifications || []).map(function (item) {
            return {
                getSpecialty() {
                    return item.specialty || "";
                },
                getQualification() {
                    return item.qualification || "";
                },
                getRank() {
                    return item.rank || "";
                }
            };
        });
    }

    /**
     * @method getMainQualification
     * @returns {Object|null}
     */
    getMainQualification() {
        let indexForMainQualification = 0;

        return this.getQualifications()[indexForMainQualification] || null;
    }

    /**
     * @method getWorkExperience
     * @returns {Array}
     */
    getWorkExperience() {
        return (this.entity.workExperience || []).map(function (item) {
            return {
                getTime() {
                    return item.time || "";
                },
                getDescription() {
                    return item.description || "";
                }
            };
        });
    }

    /**
     * @method getLastWorkExperience
     * @returns {Object|null}
     */
    getLastWorkExperience() {
        let indexForLastWorkExperience = 0;

        return this.getWorkExperience()[indexForLastWorkExperience] || null;
    }

    /**
     * @method getCompany
     * @returns {Company}
     */
    getCompany() {
        return new Company(this.entity.company);
    }
}

export default Employee;
