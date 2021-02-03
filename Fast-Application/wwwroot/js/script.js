const firstStage = document.getElementById('form-body-1');
const warningText = document.getElementById('errorMessage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function getStorageInfo(formStage) {
  const requiredFields = formStage.querySelectorAll('[required]');

  for (const field of requiredFields) {
    const fieldElName = document.getElementById(field.name);
    if (localStorage.key(fieldElName)) {
      field.value = localStorage.getItem(field.name);
    }
  }
}

function checkFieldsAndSetData(form) {
  const requiredFields = form.querySelectorAll(`[required]`);

  let isInvalid = false;
  for (const field of requiredFields) {
    if (field.value === '' || (field.type === 'checkbox' && !field.checked)) {
      if (field.type === 'radio') {
        continue;
      }
      console.log(field);
      field.classList.add('border');
      field.classList.add('border-danger');
      warningText.style.display = 'block';
      isInvalid = true;
    } else {
      field.classList.remove('border-danger');
      field.classList.add('border-success');
      warningText.style.display = 'none';

      localStorage.setItem(field.name, field.value);
    }
    console.log(isInvalid);
  }
  return isInvalid;
}

let currentStage = 1;
firstStage.style.display = 'block';
getStorageInfo(firstStage);

let eightStageOption = 0;
const nextPrevBtns = document.getElementsByClassName('nf-next-previous');
for (const el of nextPrevBtns) {
  const nextPrevDiv = el.children;
  for (const child of nextPrevDiv) {
    if (child.firstElementChild.className === 'nf-next') {
      child.addEventListener('click', (ev) => {
        ev.preventDefault();
        const formBody = document.getElementById(`form-body-${currentStage}`);
        if (currentStage === 7) {
          const fiveYearsOrMoreChecked = document.getElementById(
            'fiveYearsOrMore'
          ).checked;
          const fiveYearsOrMoreUnchecked = document.getElementById(
            'notfiveYearsOrMore'
          ).checked;
          if (fiveYearsOrMoreChecked) {
            eightStageOption = 1;
          } else if (fiveYearsOrMoreUnchecked) {
            eightStageOption = 2;
          }
        }
        if (currentStage === 7) {
          const isInvalid = checkFieldsAndSetData(formBody);
          if (!isInvalid) {
            console.log(eightStageOption);
            const nextFormBody = document.getElementById(
              `form-body-${++currentStage}-${eightStageOption}`
            );
            formBody.style.display = 'none';
            nextFormBody.style.display = 'block';
            getStorageInfo(nextFormBody);
          }
        } else {
          if (currentStage === 8) {
            const eightStageFormBody = document.getElementById(
              `form-body-${currentStage}-${eightStageOption}`
            );
            console.log(eightStageFormBody);
            console.log(currentStage);
            console.log(eightStageOption);
            const isInvalid = checkFieldsAndSetData(eightStageFormBody);
            if (!isInvalid) {
              const nextFormBody = document.getElementById(
                `form-body-${++currentStage}`
              );
              eightStageFormBody.style.display = 'none';
              nextFormBody.style.display = 'block';
              getStorageInfo(nextFormBody);
            }
          } else {
            const isInvalid = checkFieldsAndSetData(formBody);
            if (!isInvalid) {
              const nextFormBody = document.getElementById(
                `form-body-${++currentStage}`
              );
              formBody.style.display = 'none';
              nextFormBody.style.display = 'block';
              getStorageInfo(nextFormBody);
            }
          }
        }
      });
    } else if (child.firstElementChild.className === 'nf-previous') {
      child.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (currentStage === 8) {
          const eightStageFormBody = document.getElementById(
            `form-body-${currentStage}-${eightStageOption}`
          );
          const prevFormBody = document.getElementById(
            `form-body-${--currentStage}`
          );
          eightStageFormBody.style.display = 'none';
          prevFormBody.style.display = 'block';
        } else {
          const formBody = document.getElementById(`form-body-${currentStage}`);
          formBody.style.display = 'none';
          if (currentStage === 9) {
            const prevEightStageFormBody = document.getElementById(
              `form-body-${--currentStage}-${eightStageOption}`
            );
            prevEightStageFormBody.style.display = 'block';
          } else {
            const prevFormBody = document.getElementById(
              `form-body-${--currentStage}`
            );
            prevFormBody.style.display = 'block';
          }
        }
      });
    }
  }
}
