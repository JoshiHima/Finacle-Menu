// Function to open section
function openSection(evt, sectionName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("section");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(sectionName).style.display = "block";
    evt.currentTarget.className += " active";
    document.getElementById("tabContainer").style.display = "block";
}

// Validation function for Function page
function validateFunction() {
    var isValid = true;
    var successDiv = document.getElementById("functionSuccess");

    // Clear errors and success message
    ["functionError", "schemeCodeError", "productIdError", "schemeTypeError"].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
    successDiv.style.display = "none";

    // Validate fields
    var fields = [
        { id: "function", required: true },
        { id: "schemeCode", required: true },
        { id: "productId", required: true },
        { id: "schemeType", required: true }
    ];
    fields.forEach(field => {
        var value = document.getElementById(field.id).value.trim();
        var errorDiv = document.getElementById(field.id + "Error");
        if (!value && field.required) {
            isValid = false;
            errorDiv.innerHTML = "This field is required.";
        }
    });

    if (isValid) {
        successDiv.style.display = "block";
        document.getElementById("functionPage").style.display = "none";
        document.getElementById("tabContainer").style.display = "block";
        document.getElementById("scheme").style.display = "block";
        document.getElementsByClassName("tablinks")[0].className += " active";

        // Send data to backend
        const data = {
            function_type: document.getElementById("function").value,
            scheme_code: document.getElementById("schemeCode").value,
            product_id: document.getElementById("productId").value,
            scheme_type: document.getElementById("schemeType").value
        };
        fetch('http://localhost:3000/api/save-function', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => console.log(result.message))
            .catch(error => console.error('Error:', error));
    }
}


// Validation function for Section 2 (Scheme)
function validateSection2() {
    var form = document.getElementById("myForm");
    var isValid = true;
    var successDiv = document.getElementById("section2Success");

    // Clear errors and success message
    [
        "setIdError", "natureOfSchemeError", "additionalCalendarBaseError", "expiryDateError",
        "transactionRestrictionError", "acIdGenerationError", "sequenceError", "minPostingWorkClassError",
        "productConceptError", "schemeSupervisorIdError", "acDetailsError", "productEligibilityCriteriaError",
        "minAgeError", "languagePreferenceError", "preferredLanguageCodeError", "productTypeError",
        "effectiveDateError", "schemeNameError", "shortNameError", "acPrefixError", "nonresidentError",
        "productGroupError", "pdGeneralLedgerSubheadError", "transactionDetailsError", "maxAgeError",
        "schemeNamePreferredError", "schemeShortNamePreferredError"
    ].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
    successDiv.style.display = "none";

    // Validate fields
    var fields = [
        { id: "setId", required: true },
        { id: "expiryDate", required: true, pattern: /^\d{2}-\d{2}-\d{4}$/ },
        { id: "transactionRestriction", required: true },
        { id: "acIdGeneration", required: true },
        { id: "sequence", required: true },
        { id: "minPostingWorkClass", required: true },
        { id: "productConcept", required: true },
        { id: "schemeSupervisorId", required: true },
        { id: "acDetails", required: true },
        { id: "productEligibilityCriteria", required: true },
        { id: "minAge", required: true, type: "number" },
        { id: "languagePreference", required: true },
        { id: "preferredLanguageCode", required: true },
        { id: "productType", required: true },
        { id: "effectiveDate", required: true, pattern: /^\d{2}-\d{2}-\d{4}$/ },
        { id: "schemeName", required: true },
        { id: "shortName", required: true },
        { id: "acPrefix", required: true },
        { id: "productGroup", required: true },
        { id: "pdGeneralLedgerSubhead", required: true },
        { id: "transactionDetails", required: true },
        { id: "maxAge", required: true, type: "number" },
        { id: "schemeNamePreferred", required: true },
        { id: "schemeShortNamePreferred", required: true }
    ];
    fields.forEach(field => {
        var value = document.getElementById(field.id).value.trim();
        var errorDiv = document.getElementById(field.id + "Error");
        if (!value && field.required) {
            isValid = false;
            errorDiv.innerHTML = "This field is required.";
        } else if (field.type === "number" && isNaN(value)) {
            isValid = false;
            errorDiv.innerHTML = "Must be a number.";
        } else if (field.pattern && !field.pattern.test(value)) {
            isValid = false;
            errorDiv.innerHTML = "Must be in MM-DD-YYYY format.";
        }
    });

    // Checkbox validation
    ["natureOfScheme", "additionalCalendarBase", "nonresident"].forEach(fieldId => {
        var checkboxes = document.getElementsByName(fieldId);
        var checked = false;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checked = true;
                break;
            }
        }
        if (!checked) {
            isValid = false;
            document.getElementById(fieldId + "Error").innerHTML = "At least one option must be selected.";
        }
    });

    // Date and age comparison validation
    var effectiveDate = document.getElementById("effectiveDate").value.trim();
    var expiryDate = document.getElementById("expiryDate").value.trim();
    var minAge = parseInt(document.getElementById("minAge").value.trim(), 10);
    var maxAge = parseInt(document.getElementById("maxAge").value.trim(), 10);

    if (effectiveDate && expiryDate) {
        var effective = new Date(effectiveDate.split("-")[2], effectiveDate.split("-")[0] - 1, effectiveDate.split("-")[1]);
        var expiry = new Date(expiryDate.split("-")[2], expiryDate.split("-")[0] - 1, expiryDate.split("-")[1]);
        if (expiry < effective) {
            isValid = false;
            document.getElementById("expiryDateError").innerHTML = "Expiry date must be greater than or equal to effective date.";
            document.getElementById("effectiveDateError").innerHTML = "Effective date must be less than or equal to expiry date.";
        }
    }
    if (!isNaN(minAge) && !isNaN(maxAge) && maxAge <= minAge) {
        isValid = false;
        document.getElementById("maxAgeError").innerHTML = "Max age must be greater than min age.";
        document.getElementById("minAgeError").innerHTML = "Min age must be less than max age.";
    }

    if (isValid) {
        successDiv.style.display = "block";
        openSection({ currentTarget: document.getElementsByClassName("tablinks")[1] }, "dormat");

        // Send data to backend
        const data = {
            set_id: document.getElementById("setId").value,
            nature_of_scheme: Array.from(document.getElementsByName("natureOfScheme"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            additional_calendar_base: Array.from(document.getElementsByName("additionalCalendarBase"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            expiry_date: document.getElementById("expiryDate").value,
            transaction_restriction: document.getElementById("transactionRestriction").value,
            ac_id_generation: document.getElementById("acIdGeneration").value,
            sequence: document.getElementById("sequence").value,
            min_posting_work_class: document.getElementById("minPostingWorkClass").value,
            product_concept: document.getElementById("productConcept").value,
            scheme_supervisor_id: document.getElementById("schemeSupervisorId").value,
            ac_details: document.getElementById("acDetails").value,
            product_eligibility_criteria: document.getElementById("productEligibilityCriteria").value,
            min_age: document.getElementById("minAge").value,
            language_preference: document.getElementById("languagePreference").value,
            preferred_language_code: document.getElementById("preferredLanguageCode").value,
            product_type: document.getElementById("productType").value,
            effective_date: document.getElementById("effectiveDate").value,
            scheme_name: document.getElementById("schemeName").value,
            short_name: document.getElementById("shortName").value,
            ac_prefix: document.getElementById("acPrefix").value,
            nonresident: Array.from(document.getElementsByName("nonresident"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            product_group: document.getElementById("productGroup").value,
            pd_general_ledger_subhead: document.getElementById("pdGeneralLedgerSubhead").value,
            transaction_details: document.getElementById("transactionDetails").value,
            max_age: document.getElementById("maxAge").value,
            scheme_name_preferred: document.getElementById("schemeNamePreferred").value,
            scheme_short_name_preferred: document.getElementById("schemeShortNamePreferred").value
        };
        fetch('http://localhost:3000/api/save-scheme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => console.log(result.message))
            .catch(error => console.error('Error:', error));
    }
}


// Validation function for Section 3 (Dormat)
function validateSection3() {
    var form = document.getElementById("myForm");
    var isValid = true;
    var successDiv = document.getElementById("section3Success");

    // Clear errors and success message
    [
        "noOfWithdrawalsError", "minBalanceWithChequeError", "ledgerFolioFeeError",
        "inactiveAcAbnormalTransactionLimitError", "durationToMarkAsInactiveError", "dormatFeeError",
        "interestMethodDrError", "fromBalanceDateError", "allowError", "acStatementError", "dormatFrequencyCode1Error",
        "dormatFrequencyCode2Error", "dormatFrequencyCode3Error", "dormatFrequencyCode4Error", "dormatFrequencyCode5Error",
        "specialSavingsSchemeError", "withdrawalNoticePeriodMonthError", "withdrawalNoticePeriodDayError",
        "maxNoOfWithdrawalsWithoutNoticeError", "withdrawalFrequencyError", "noInterestIfWithdrawalsExceedError",
        "debitBalanceLimitError", "feeOrExtraWithdrawalError", "dormatAcAbnormalTransactionLimitError",
        "durationFromInactiveToDormatError", "inactiveFeeError", "interestMethodCrError", "toBalanceDateError",
        "noOfNomineesAllowedError", "statementFrequency1Error", "statementFrequency2Error", "statementFrequency3Error",
        "statementFrequency4Error", "statementFrequency5Error", "statementFrequency6Error", "inactiveFrequencyCode1Error",
        "inactiveFrequencyCode2Error", "inactiveFrequencyCode3Error", "inactiveFrequencyCode4Error",
        "inactiveFrequencyCode5Error", "specialSavingsAcSubcategoryError", "closureNoticePeriodMonthError",
        "closureNoticePeriodDayError", "maxWithdrawalAmtWithoutNoticeError"
    ].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
    successDiv.style.display = "none";

    // Validate fields
    var fields = [
        { id: "noOfWithdrawals", required: true, type: "number", value: "12" },
        { id: "minBalanceWithCheque", required: true, type: "number" },
        { id: "ledgerFolioFee", required: true, type: "number" },
        { id: "inactiveAcAbnormalTransactionLimit", required: true, type: "number" },
        { id: "durationToMarkAsInactive", required: true, type: "number" },
        { id: "dormatFee", required: true },
        { id: "interestMethodDr", required: true },
        { id: "fromBalanceDate", required: true },
        { id: "acStatement", required: true },
        { id: "dormatFrequencyCode1", required: true },
        { id: "dormatFrequencyCode2", required: true },
        { id: "dormatFrequencyCode3", required: true },
        { id: "dormatFrequencyCode4", required: true },
        { id: "dormatFrequencyCode5", required: true },
        { id: "specialSavingsScheme", required: true },
        { id: "withdrawalNoticePeriodMonth", required: true },
        { id: "withdrawalNoticePeriodDay", required: true },
        { id: "maxNoOfWithdrawalsWithoutNotice", required: true, type: "number" },
        { id: "withdrawalFrequency", required: true },
        { id: "debitBalanceLimit", required: true, type: "number" },
        { id: "feeOrExtraWithdrawal", required: true, type: "number" },
        { id: "dormatAcAbnormalTransactionLimit", required: true, type: "number" },
        { id: "durationFromInactiveToDormat", required: true, type: "number" },
        { id: "inactiveFee", required: true },
        { id: "interestMethodCr", required: true },
        { id: "toBalanceDate", required: true },
        { id: "noOfNomineesAllowed", required: true, type: "number" },
        { id: "statementFrequency1", required: true },
        { id: "statementFrequency2", required: true },
        { id: "statementFrequency3", required: true },
        { id: "statementFrequency4", required: true },
        { id: "statementFrequency5", required: true },
        { id: "statementFrequency6", required: true },
        { id: "inactiveFrequencyCode1", required: true },
        { id: "inactiveFrequencyCode2", required: true },
        { id: "inactiveFrequencyCode3", required: true },
        { id: "inactiveFrequencyCode4", required: true },
        { id: "inactiveFrequencyCode5", required: true },
        { id: "specialSavingsAcSubcategory", required: true },
        { id: "closureNoticePeriodMonth", required: true },
        { id: "closureNoticePeriodDay", required: true },
        { id: "maxWithdrawalAmtWithoutNotice", required: true, type: "number" }
    ];
    fields.forEach(field => {
        var value = document.getElementById(field.id).value.trim();
        var errorDiv = document.getElementById(field.id + "Error");
        if (!value && field.required) {
            isValid = false;
            errorDiv.innerHTML = "This field is required.";
        } else if (field.type === "number" && isNaN(value)) {
            isValid = false;
            errorDiv.innerHTML = "Must be a number.";
        }
    });

    // Checkbox validation
    ["noInterestIfWithdrawalsExceed", "allow"].forEach(fieldId => {
        var checkboxes = document.getElementsByName(fieldId);
        var checked = false;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checked = true;
                break;
            }
        }
        if (!checked) {
            isValid = false;
            document.getElementById(fieldId + "Error").innerHTML = "At least one option must be selected.";
        }
    });

    if (isValid) {
        successDiv.style.display = "block";
        openSection({ currentTarget: document.getElementsByClassName("tablinks")[2] }, "section4");

        // Send data to backend
        const data = {
            no_of_withdrawals: document.getElementById("noOfWithdrawals").value,
            min_balance_with_cheque: document.getElementById("minBalanceWithCheque").value,
            ledger_folio_fee: document.getElementById("ledgerFolioFee").value,
            inactive_ac_abnormal_transaction_limit: document.getElementById("inactiveAcAbnormalTransactionLimit").value,
            duration_to_mark_as_inactive: document.getElementById("durationToMarkAsInactive").value,
            dormat_fee: document.getElementById("dormatFee").value,
            interest_method_dr: document.getElementById("interestMethodDr").value,
            from_balance_date: document.getElementById("fromBalanceDate").value,
            ac_statement: document.getElementById("acStatement").value,
            dormat_frequency_code1: document.getElementById("dormatFrequencyCode1").value,
            dormat_frequency_code2: document.getElementById("dormatFrequencyCode2").value,
            dormat_frequency_code3: document.getElementById("dormatFrequencyCode3").value,
            dormat_frequency_code4: document.getElementById("dormatFrequencyCode4").value,
            dormat_frequency_code5: document.getElementById("dormatFrequencyCode5").value,
            special_savings_scheme: document.getElementById("specialSavingsScheme").value,
            withdrawal_notice_period_month: document.getElementById("withdrawalNoticePeriodMonth").value,
            withdrawal_notice_period_day: document.getElementById("withdrawalNoticePeriodDay").value,
            max_no_of_withdrawals_without_notice: document.getElementById("maxNoOfWithdrawalsWithoutNotice").value,
            withdrawal_frequency: document.getElementById("withdrawalFrequency").value,
            no_interest_if_withdrawals_exceed: Array.from(document.getElementsByName("noInterestIfWithdrawalsExceed"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            debit_balance_limit: document.getElementById("debitBalanceLimit").value,
            fee_or_extra_withdrawal: document.getElementById("feeOrExtraWithdrawal").value,
            dormat_ac_abnormal_transaction_limit: document.getElementById("dormatAcAbnormalTransactionLimit").value,
            duration_from_inactive_to_dormat: document.getElementById("durationFromInactiveToDormat").value,
            inactive_fee: document.getElementById("inactiveFee").value,
            interest_method_cr: document.getElementById("interestMethodCr").value,
            to_balance_date: document.getElementById("toBalanceDate").value,
            no_of_nominees_allowed: document.getElementById("noOfNomineesAllowed").value,
            statement_frequency1: document.getElementById("statementFrequency1").value,
            statement_frequency2: document.getElementById("statementFrequency2").value,
            statement_frequency3: document.getElementById("statementFrequency3").value,
            statement_frequency4: document.getElementById("statementFrequency4").value,
            statement_frequency5: document.getElementById("statementFrequency5").value,
            statement_frequency6: document.getElementById("statementFrequency6").value,
            inactive_frequency_code1: document.getElementById("inactiveFrequencyCode1").value,
            inactive_frequency_code2: document.getElementById("inactiveFrequencyCode2").value,
            inactive_frequency_code3: document.getElementById("inactiveFrequencyCode3").value,
            inactive_frequency_code4: document.getElementById("inactiveFrequencyCode4").value,
            inactive_frequency_code5: document.getElementById("inactiveFrequencyCode5").value,
            special_savings_ac_subcategory: document.getElementById("specialSavingsAcSubcategory").value,
            closure_notice_period_month: document.getElementById("closureNoticePeriodMonth").value,
            closure_notice_period_day: document.getElementById("closureNoticePeriodDay").value,
            max_withdrawal_amt_without_notice: document.getElementById("maxWithdrawalAmtWithoutNotice").value,
            allow: Array.from(document.getElementsByName("allow"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(",")
        };
        console.log("The data:", data);
        fetch('http://localhost:3000/api/save-dormat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => console.log("The Dormat Response: ", result.message))
            .catch(error => console.error('Error:', error));
    }
}

// Validation function for Section 4 (Interest)
function validateSection4() {
    var form = document.getElementById("myForm");
    var isValid = true;
    var successDiv = document.getElementById("section4Success");

    // Clear errors and success message
    [
        "transactionCodeError", "amountError", "transactionDateError", "descriptionError", "plAccountCcyError",
        "interestPayableError", "interestReceivableError", "pastInterestPlaceholderError", "pastDueInterestPlaceholderError",
        "serviceFeeError", "plNormalInterestPaidError", "plPenalInterestPaidError", "overdueInterestPayableError",
        "parkingStopInterestRecalcDrError", "interestCompoundingFreqDrError", "bookingTransactionScriptError",
        "interestTransactionScriptError", "interestCalcFreqDr1Error", "interestCalcFreqDr2Error", "interestCalcFreqDr3Error",
        "interestCalcFreqDr4Error", "interestCalcFreqDr5Error", "interestCalcFreqDr6Error", "interestOptionsError",
        "pegInterestToAcError", "pegReviewCustomerError", "debitCompoundingRestError", "transferInterestDetailsError",
        "acPlaceholder1Error", "pastDueInterestPlaceholder2Error", "acPlaceholder2Error", "plNormalInterestReceivedError",
        "interestParkingPriorTaxError", "plOverdueInterestTDError", "advanceInterestAvError", "stopInterestRecalcCrError",
        "creditInterestCompoundingFreqError", "interestCalcFreqCr1Error", "interestCalcFreqCr2Error", "interestCalcFreqCr3Error",
        "interestCalcFreqCr4Error", "interestCalcFreqCr5Error", "interestCalcFreqCr6Error", "modificationOfPegAllowedError",
        "creditCompoundingRestError", "lookBackPeriodError"
    ].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
    successDiv.style.display = "none";

    // Validate fields
    var fields = [
        { id: "transactionCode", required: true },
        { id: "amount", required: true, type: "number" },
        { id: "transactionDate", required: true, pattern: /^\d{2}-\d{2}-\d{4}$/ },
        { id: "description", required: true },
        { id: "pastInterestPlaceholder", required: true, type: "number" },
        { id: "pastDueInterestPlaceholder", required: true, type: "number" },
        { id: "plNormalInterestPaid", required: true, type: "number" },
        { id: "plPenalInterestPaid", required: true, type: "number" },
        { id: "overdueInterestPayable", required: true },
        { id: "bookingTransactionScript", required: true },
        { id: "interestTransactionScript", required: true },
        { id: "acPlaceholder1", required: true },
        { id: "pastDueInterestPlaceholder2", required: true, type: "number" },
        { id: "acPlaceholder2", required: true },
        { id: "plNormalInterestReceived", required: true, type: "number" },
        { id: "interestParkingPriorTax", required: true },
        { id: "plOverdueInterestTD", required: true, type: "number" },
        { id: "advanceInterestAv", required: true },
        { id: "lookBackPeriod", required: true, type: "number" },
        { id: "interestCompoundingFreqDr", required: true },
        { id: "creditInterestCompoundingFreq", required: true },
        { id: "interestCalcFreqDr1", required: true },
        { id: "interestCalcFreqDr2", required: true },
        { id: "interestCalcFreqDr3", required: true },
        { id: "interestCalcFreqDr4", required: true },
        { id: "interestCalcFreqDr5", required: true },
        { id: "interestCalcFreqDr6", required: true },
        { id: "interestCalcFreqCr1", required: true },
        { id: "interestCalcFreqCr2", required: true },
        { id: "interestCalcFreqCr3", required: true },
        { id: "interestCalcFreqCr4", required: true },
        { id: "interestCalcFreqCr5", required: true },
        { id: "interestCalcFreqCr6", required: true }
    ];
    fields.forEach(field => {
        var value = document.getElementById(field.id).value.trim();
        var errorDiv = document.getElementById(field.id + "Error");
        if (!value && field.required) {
            isValid = false;
            errorDiv.innerHTML = "This field is required.";
        } else if (field.type === "number" && isNaN(value)) {
            isValid = false;
            errorDiv.innerHTML = "Must be a number.";
        } else if (field.pattern && !field.pattern.test(value)) {
            isValid = false;
            errorDiv.innerHTML = "Must be in MM-DD-YYYY format.";
        }
    });

    // Checkbox validation
    ["plAccountCcy", "interestPayable", "interestReceivable", "serviceFee", "parkingStopInterestRecalcDr",
        "stopInterestRecalcCr", "pegInterestToAc", "pegReviewCustomer", "modificationOfPegAllowed",
        "debitCompoundingRest", "creditCompoundingRest", "transferInterestDetails", "interestOptions"].forEach(fieldId => {
            var checkboxes = document.getElementsByName(fieldId);
            var checked = false;
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checked = true;
                    break;
                }
            }
            if (!checked) {
                isValid = false;
                document.getElementById(fieldId + "Error").innerHTML = "At least one option must be selected.";
            }
        });

    if (isValid) {
        successDiv.style.display = "block";
        openSection({ currentTarget: document.getElementsByClassName("tablinks")[3] }, "asset");

        // Send data to backend
        const data = {
            transaction_code: document.getElementById("transactionCode").value,
            amount: document.getElementById("amount").value,
            transaction_date: document.getElementById("transactionDate").value,
            description: document.getElementById("description").value,
            pl_account_ccy: Array.from(document.getElementsByName("plAccountCcy"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            interest_payable: Array.from(document.getElementsByName("interestPayable"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            interest_receivable: Array.from(document.getElementsByName("interestReceivable"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            past_interest_placeholder: document.getElementById("pastInterestPlaceholder").value,
            past_due_interest_placeholder: document.getElementById("pastDueInterestPlaceholder").value,
            service_fee: Array.from(document.getElementsByName("serviceFee"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            pl_normal_interest_paid: document.getElementById("plNormalInterestPaid").value,
            pl_penal_interest_paid: document.getElementById("plPenalInterestPaid").value,
            overdue_interest_payable: document.getElementById("overdueInterestPayable").value,
            parking_stop_interest_recalc_dr: Array.from(document.getElementsByName("parkingStopInterestRecalcDr"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            interest_compounding_freq_dr: document.getElementById("interestCompoundingFreqDr").value,
            booking_transaction_script: document.getElementById("bookingTransactionScript").value,
            interest_transaction_script: document.getElementById("interestTransactionScript").value,
            interest_calc_freq_dr1: document.getElementById("interestCalcFreqDr1").value,
            interest_calc_freq_dr2: document.getElementById("interestCalcFreqDr2").value,
            interest_calc_freq_dr3: document.getElementById("interestCalcFreqDr3").value,
            interest_calc_freq_dr4: document.getElementById("interestCalcFreqDr4").value,
            interest_calc_freq_dr5: document.getElementById("interestCalcFreqDr5").value,
            interest_calc_freq_dr6: document.getElementById("interestCalcFreqDr6").value,
            interest_options: Array.from(document.getElementsByName("interestOptions"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            peg_interest_to_ac: Array.from(document.getElementsByName("pegInterestToAc"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            peg_review_customer: Array.from(document.getElementsByName("pegReviewCustomer"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            debit_compounding_rest: Array.from(document.getElementsByName("debitCompoundingRest"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            transfer_interest_details: Array.from(document.getElementsByName("transferInterestDetails"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            ac_placeholder1: document.getElementById("acPlaceholder1").value,
            past_due_interest_placeholder2: document.getElementById("pastDueInterestPlaceholder2").value,
            ac_placeholder2: document.getElementById("acPlaceholder2").value,
            pl_normal_interest_received: document.getElementById("plNormalInterestReceived").value,
            interest_parking_prior_tax: document.getElementById("interestParkingPriorTax").value,
            pl_overdue_interest_td: document.getElementById("plOverdueInterestTD").value,
            advance_interest_av: document.getElementById("advanceInterestAv").value,
            stop_interest_recalc_cr: Array.from(document.getElementsByName("stopInterestRecalcCr"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            credit_interest_compounding_freq: document.getElementById("creditInterestCompoundingFreq").value,
            interest_calc_freq_cr1: document.getElementById("interestCalcFreqCr1").value,
            interest_calc_freq_cr2: document.getElementById("interestCalcFreqCr2").value,
            interest_calc_freq_cr3: document.getElementById("interestCalcFreqCr3").value,
            interest_calc_freq_cr4: document.getElementById("interestCalcFreqCr4").value,
            interest_calc_freq_cr5: document.getElementById("interestCalcFreqCr5").value,
            interest_calc_freq_cr6: document.getElementById("interestCalcFreqCr6").value,
            modification_of_peg_allowed: Array.from(document.getElementsByName("modificationOfPegAllowed"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            credit_compounding_rest: Array.from(document.getElementsByName("creditCompoundingRest"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            look_back_period: document.getElementById("lookBackPeriod").value
        };
        fetch('http://localhost:3000/api/save-interest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => console.log(result.message))
            .catch(error => console.error('Error:', error));
    }
}

function validateAsset() {
    var form = document.getElementById("myForm");
    var isValid = true;
    var successDiv = document.getElementById("assetSuccess");

    // Clear errors and success message
    [
        "pastDuePeriodError", "subclassificationError", "pastDueError", "placeholdersInterestSuspenseError",
        "provisionDebitError", "recordError", "classificationMainError", "interestError", "manualError",
        "placeholdersPenalInterestSuspenseError", "provisionCreditError"
    ].forEach(id => {
        document.getElementById(id).innerHTML = "";
    });
    successDiv.style.display = "none";

    // Validate fields
    var fields = [
        { id: "pastDuePeriod", required: true, type: "number" },
        { id: "subclassification", required: true },
        { id: "placeholdersInterestSuspense", required: true },
        { id: "provisionDebit", required: true },
        { id: "classificationMain", required: true },
        { id: "placeholdersPenalInterestSuspense", required: true },
        { id: "provisionCredit", required: true }
    ];
    fields.forEach(field => {
        var value = document.getElementById(field.id).value.trim();
        var errorDiv = document.getElementById(field.id + "Error");
        if (!value && field.required) {
            isValid = false;
            errorDiv.innerHTML = "This field is required.";
        } else if (field.type === "number" && isNaN(value)) {
            isValid = false;
            errorDiv.innerHTML = "Must be a number.";
        }
    });

    // Checkbox validation
    ["pastDue", "interest", "manual", "record"].forEach(fieldId => {
        var checkboxes = document.getElementsByName(fieldId);
        var checked = false;
        if (checkboxes.length) {
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checked = true;
                    break;
                }
            }
        } else if (checkboxes && !checkboxes.checked) {
            checked = false;
        }
        if (!checked) {
            isValid = false;
            document.getElementById(fieldId + "Error").innerHTML = "At least one option must be selected.";
        }
    });

    if (isValid) {
        successDiv.style.display = "block";

        // Send data to backend
        const data = {
            past_due_period: document.getElementById("pastDuePeriod").value,
            subclassification: document.getElementById("subclassification").value,
            past_due: Array.from(document.getElementsByName("pastDue"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            placeholders_interest_suspense: document.getElementById("placeholdersInterestSuspense").value,
            provision_debit: document.getElementById("provisionDebit").value,
            record: Array.from(document.getElementsByName("record"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            classification_main: document.getElementById("classificationMain").value,
            interest: Array.from(document.getElementsByName("interest"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            manual: Array.from(document.getElementsByName("manual"))
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .join(","),
            placeholders_penal_interest_suspense: document.getElementById("placeholdersPenalInterestSuspense").value,
            provision_credit: document.getElementById("provisionCredit").value
        };
        fetch('http://localhost:3000/api/save-asset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => console.log(result.message))
            .catch(error => console.error('Error:', error));
    }
}


function clearSection(sectionId) {
    var form = document.getElementById("myForm");
    if (!form) {
        console.error("myForm not found!");
        return;
    }
    var successDiv = document.getElementById(sectionId + "Success");

    // Clear success message
    if (successDiv) {
        successDiv.style.display = "none";
    }

    // Clear input fields (text and number) within the section
    var inputs = document.querySelectorAll("#" + sectionId + " input[type='text'], #" + sectionId + " input[type='number']");
    inputs.forEach(function (input) {
        input.value = "";
    });

    // Clear select elements within the section
    var selects = document.querySelectorAll("#" + sectionId + " select");
    selects.forEach(function (select) {
        select.selectedIndex = 0;
    });

    // Clear checkboxes within the section
    var checkboxes = document.querySelectorAll("#" + sectionId + " input[type='checkbox']");
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Clear error messages within the section
    var errorDivs = document.querySelectorAll("#" + sectionId + " .error");
    errorDivs.forEach(function (errorDiv) {
        errorDiv.innerHTML = "";
    });
}

// Wrapper functions for Clear buttons
function clearFunction() {
    clearSection("functionPage");
}

function clearSection2() {
    clearSection("scheme");
}

function clearSection3() {
    clearSection("dormat");
}

function clearSection4() {
    clearSection("section4");
}

function clearAsset() {
    clearSection("asset");
}

function openSection(evt, sectionName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("section");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(sectionName).style.display = "block";
    // Find and activate the corresponding tab button based on sectionName
    var tabOrder = ["scheme", "dormat", "section4", "asset"];
    var tabIndex = tabOrder.indexOf(sectionName);
    if (tabIndex !== -1 && tablinks[tabIndex]) {
        tablinks[tabIndex].className += " active";
    }
    document.getElementById("tabContainer").style.display = "block";
}

//function to validate for each data fields of each tabs

function validate() {
    var allTabs = ["scheme", "dormat", "section4", "asset"]; // Updated to use "section4" for Interest
    var missingTabs = [];
    var form = document.getElementById("myForm");

    // Clear previous error messages
    var existingErrors = document.getElementById("validationErrors");
    if (existingErrors) existingErrors.remove();

    // Clear all inline errors
    var allErrorDivs = document.getElementsByClassName("error");
    for (var i = 0; i < allErrorDivs.length; i++) {
        allErrorDivs[i].innerHTML = "";
    }

    // Validate each tab (excluding functionPage)
    var allFields = {
        scheme: [
            { id: "setId", type: "text", required: true },
            { id: "expiryDate", type: "text", required: true, pattern: /^\d{2}-\d{2}-\d{4}$/ },
            { id: "transactionRestriction", type: "text", required: true },
            { id: "acIdGeneration", type: "text", required: true },
            { id: "sequence", type: "text", required: true },
            { id: "minPostingWorkClass", type: "text", required: true },
            { id: "productConcept", type: "text", required: true },
            { id: "schemeSupervisorId", type: "text", required: true },
            { id: "acDetails", type: "select", required: true },
            { id: "productEligibilityCriteria", type: "text", required: true },
            { id: "minAge", type: "number", required: true },
            { id: "languagePreference", type: "text", required: true },
            { id: "preferredLanguageCode", type: "text", required: true },
            { id: "productType", type: "text", required: true },
            { id: "effectiveDate", type: "text", required: true, pattern: /^\d{2}-\d{2}-\d{4}$/ },
            { id: "schemeName", type: "text", required: true },
            { id: "shortName", type: "text", required: true },
            { id: "acPrefix", type: "text", required: true },
            { id: "productGroup", type: "text", required: true },
            { id: "pdGeneralLedgerSubhead", type: "text", required: true },
            { id: "transactionDetails", type: "select", required: true },
            { id: "maxAge", type: "number", required: true },
            { id: "schemeNamePreferred", type: "text", required: true },
            { id: "schemeShortNamePreferred", type: "text", required: true }
        ],
        dormat: [
            { id: "noOfWithdrawals", type: "number", required: true },
            { id: "minBalanceWithCheque", type: "number", required: true },
            { id: "ledgerFolioFee", type: "number", required: true },
            { id: "inactiveAcAbnormalTransactionLimit", type: "number", required: true },
            { id: "durationToMarkAsInactive", type: "number", required: true },
            { id: "dormatFee", type: "text", required: true },
            { id: "interestMethodDr", type: "select", required: true },
            { id: "fromBalanceDate", type: "select", required: true },
            { id: "acStatement", type: "select", required: true },
            { id: "dormatFrequencyCode1", type: "select", required: true },
            { id: "dormatFrequencyCode2", type: "select", required: true },
            { id: "dormatFrequencyCode3", type: "select", required: true },
            { id: "dormatFrequencyCode4", type: "select", required: true },
            { id: "dormatFrequencyCode5", type: "select", required: true },
            { id: "specialSavingsScheme", type: "select", required: true },
            { id: "withdrawalNoticePeriodMonth", type: "select", required: true },
            { id: "withdrawalNoticePeriodDay", type: "select", required: true },
            { id: "maxNoOfWithdrawalsWithoutNotice", type: "number", required: true },
            { id: "withdrawalFrequency", type: "select", required: true },
            { id: "debitBalanceLimit", type: "number", required: true },
            { id: "feeOrExtraWithdrawal", type: "number", required: true },
            { id: "dormatAcAbnormalTransactionLimit", type: "number", required: true },
            { id: "durationFromInactiveToDormat", type: "number", required: true },
            { id: "inactiveFee", type: "text", required: true },
            { id: "interestMethodCr", type: "select", required: true },
            { id: "toBalanceDate", type: "select", required: true },
            { id: "noOfNomineesAllowed", type: "number", required: true },
            { id: "statementFrequency1", type: "select", required: true },
            { id: "statementFrequency2", type: "select", required: true },
            { id: "statementFrequency3", type: "select", required: true },
            { id: "statementFrequency4", type: "select", required: true },
            { id: "statementFrequency5", type: "select", required: true },
            { id: "statementFrequency6", type: "select", required: true },
            { id: "inactiveFrequencyCode1", type: "select", required: true },
            { id: "inactiveFrequencyCode2", type: "select", required: true },
            { id: "inactiveFrequencyCode3", type: "select", required: true },
            { id: "inactiveFrequencyCode4", type: "select", required: true },
            { id: "inactiveFrequencyCode5", type: "select", required: true },
            { id: "specialSavingsAcSubcategory", type: "text", required: true },
            { id: "closureNoticePeriodMonth", type: "select", required: true },
            { id: "closureNoticePeriodDay", type: "select", required: true },
            { id: "maxWithdrawalAmtWithoutNotice", type: "number", required: true }
        ],
        section4: [ // Updated to "section4" for Interest
            { id: "transactionCode", type: "text", required: true },
            { id: "amount", type: "number", required: true },
            { id: "transactionDate", type: "text", required: true, pattern: /^\d{2}-\d{2}-\d{4}$/ },
            { id: "description", type: "text", required: true },
            { id: "pastInterestPlaceholder", type: "number", required: true },
            { id: "pastDueInterestPlaceholder", type: "number", required: true },
            { id: "plNormalInterestPaid", type: "number", required: true },
            { id: "plPenalInterestPaid", type: "number", required: true },
            { id: "overdueInterestPayable", type: "text", required: true },
            { id: "bookingTransactionScript", type: "text", required: true },
            { id: "interestTransactionScript", type: "text", required: true },
            { id: "acPlaceholder1", type: "text", required: true },
            { id: "pastDueInterestPlaceholder2", type: "number", required: true },
            { id: "acPlaceholder2", type: "text", required: true },
            { id: "plNormalInterestReceived", type: "number", required: true },
            { id: "interestParkingPriorTax", type: "text", required: true },
            { id: "plOverdueInterestTD", type: "number", required: true },
            { id: "advanceInterestAv", type: "text", required: true },
            { id: "lookBackPeriod", type: "number", required: true },
            { id: "interestCompoundingFreqDr", type: "select", required: true },
            { id: "creditInterestCompoundingFreq", type: "select", required: true },
            { id: "interestCalcFreqDr1", type: "select", required: true },
            { id: "interestCalcFreqDr2", type: "select", required: true },
            { id: "interestCalcFreqDr3", type: "select", required: true },
            { id: "interestCalcFreqDr4", type: "select", required: true },
            { id: "interestCalcFreqDr5", type: "select", required: true },
            { id: "interestCalcFreqDr6", type: "select", required: true },
            { id: "interestCalcFreqCr1", type: "select", required: true },
            { id: "interestCalcFreqCr2", type: "select", required: true },
            { id: "interestCalcFreqCr3", type: "select", required: true },
            { id: "interestCalcFreqCr4", type: "select", required: true },
            { id: "interestCalcFreqCr5", type: "select", required: true },
            { id: "interestCalcFreqCr6", type: "select", required: true }
        ],
        asset: [
            { id: "pastDuePeriod", type: "number", required: true },
            { id: "subclassification", type: "text", required: true },
            { id: "placeholdersInterestSuspense", type: "text", required: true },
            { id: "provisionDebit", type: "text", required: true },
            { id: "classificationMain", type: "text", required: true },
            { id: "placeholdersPenalInterestSuspense", type: "text", required: true },
            { id: "provisionCredit", type: "text", required: true }
        ]
    };

    // Checkbox fields to validate
    var checkboxFields = {
        scheme: ["natureOfScheme", "additionalCalendarBase", "nonresident"],
        dormat: ["noInterestIfWithdrawalsExceed"],
        section4: ["plAccountCcy", "interestPayable", "interestReceivable", "serviceFee", "parkingStopInterestRecalcDr", "stopInterestRecalcCr", "pegInterestToAc", "pegReviewCustomer", "modificationOfPegAllowed", "debitCompoundingRest", "creditCompoundingRest", "transferInterestDetails", "interestOptions"],
        asset: ["record"]
    };

    allTabs.forEach(function (tabId) {
        var isValid = true;
        var fields = allFields[tabId];
        var successDiv = document.getElementById(tabId === "section4" ? "section4Success" : tabId + "Success");

        // Skip validation if the tab has already been successfully validated
        if (successDiv && successDiv.style.display === "block") {
            return; // Skip this tab if it’s already validated
        }

        fields.forEach(function (field) {
            var value = form.elements[field.id] ? form.elements[field.id].value.trim() : "";
            var errorDiv = document.getElementById(field.id + "Error");
            if (!value || (field.type === "select" && value === "")) {
                isValid = false;
                if (errorDiv) errorDiv.innerHTML = "This field is missing.";
            } else if (field.type === "number" && isNaN(value)) {
                isValid = false;
                if (errorDiv) errorDiv.innerHTML = "Must be a number.";
            } else if (field.pattern && !field.pattern.test(value)) {
                isValid = false;
                if (errorDiv) errorDiv.innerHTML = "Must be in MM-DD-YYYY format.";
            }
        });

        // Validate checkboxes (handle radio buttons or grouped checkboxes)
        if (checkboxFields[tabId]) {
            checkboxFields[tabId].forEach(function (fieldId) {
                var checkboxes = form.elements[fieldId];
                var checked = false;
                if (checkboxes && checkboxes.length) { // Handle radio buttons or multiple checkboxes
                    for (var i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].checked) {
                            checked = true;
                            break;
                        }
                    }
                } else if (checkboxes) { // Handle single checkbox
                    checked = checkboxes.checked;
                }
                var errorDiv = document.getElementById(fieldId + "Error");
                if (!checked) {
                    isValid = false;
                    if (errorDiv) errorDiv.innerHTML = "At least one option must be selected.";
                } else {
                    if (errorDiv) errorDiv.innerHTML = ""; // Clear error if valid
                }
            });
        }

        if (!isValid) {
            missingTabs.push(tabId);
        }
    });

    // Display clickable error messages
    if (missingTabs.length > 0) {
        var errorContainer = document.createElement("div");
        errorContainer.id = "validationErrors";
        errorContainer.style.color = "red";
        missingTabs.forEach(function (tabId) {
            var tabName = tabId === "section4" ? "Interest" : tabId.charAt(0).toUpperCase() + tabId.slice(1); // Custom name for Interest
            var errorMsg = document.createElement("div");
            errorMsg.innerHTML = `<a href="#" onclick="openSection(event, '${tabId}'); return false;">Data field is missing in ${tabName} tab</a>`;
            errorMsg.style.margin = "5px 0";
            errorContainer.appendChild(errorMsg);
        });
        document.getElementById("formContainer").appendChild(errorContainer);
    } else {
        alert("All data fields in Scheme, Dormat, Interest, and Asset tabs are submitted successfully!");
    }
}