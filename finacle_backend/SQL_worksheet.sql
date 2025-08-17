-- Create table for Function tab
CREATE TABLE function_tab (
    function_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    function_type VARCHAR2(50) NOT NULL,
    scheme_code VARCHAR2(50) NOT NULL,
    product_id VARCHAR2(50) NOT NULL,
    scheme_type VARCHAR2(50) NOT NULL,
    created_date DATE DEFAULT SYSDATE
);

-- Create table for Scheme tab
CREATE TABLE scheme_tab (
    scheme_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    set_id VARCHAR2(50) NOT NULL,
    nature_of_scheme VARCHAR2(50),
    additional_calendar_base VARCHAR2(50),
    expiry_date DATE,
    transaction_restriction VARCHAR2(100),
    ac_id_generation VARCHAR2(50),
    sequence VARCHAR2(50),
    min_posting_work_class VARCHAR2(50),
    product_concept VARCHAR2(100),
    scheme_supervisor_id VARCHAR2(50),
    ac_details VARCHAR2(50),
    product_eligibility_criteria VARCHAR2(200),
    min_age NUMBER,
    language_preference VARCHAR2(50),
    preferred_language_code VARCHAR2(10),
    product_type VARCHAR2(50),
    effective_date DATE,
    scheme_name VARCHAR2(100),
    short_name VARCHAR2(50),
    ac_prefix VARCHAR2(20),
    nonresident VARCHAR2(10),
    product_group VARCHAR2(50),
    pd_general_ledger_subhead VARCHAR2(50),
    transaction_details VARCHAR2(100),
    max_age NUMBER,
    scheme_name_preferred VARCHAR2(100),
    scheme_short_name_preferred VARCHAR2(50),
    created_date DATE DEFAULT SYSDATE
);

-- Create table for Dormat tab
-- CREATE TABLE dormat_tab (
--     dormat_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     no_of_withdrawals NUMBER,
--     min_balance_with_cheque NUMBER,
--     ledger_folio_fee NUMBER,
--     inactive_ac_abnormal_transaction_limit NUMBER,
--     duration_to_mark_as_inactive NUMBER,
--     dormat_fee VARCHAR2(50),
--     interest_method_dr VARCHAR2(50),
--     from_balance_date NUMBER,
--     ac_statement VARCHAR2(50),
--     allow_data VARCHAR2(50),
--     dormat_frequency_code1 VARCHAR2(50),
--     dormat_frequency_code2 VARCHAR2(50),
--     dormat_frequency_code3 VARCHAR2(50),
--     dormat_frequency_code4 VARCHAR2(50),
--     dormat_frequency_code5 VARCHAR2(50),
--     special_savings_scheme VARCHAR2(50),
--     withdrawal_notice_period_month VARCHAR2(10),
--     withdrawal_notice_period_day VARCHAR2(10),
--     max_no_of_withdrawals_without_notice NUMBER,
--     withdrawal_frequency NUMBER,
--     no_interest_if_withdrawals_exceed VARCHAR2(10),
--     debit_balance_limit NUMBER,
--     fee_or_extra_withdrawal NUMBER,
--     dormat_ac_abnormal_transaction_limit NUMBER,
--     duration_from_inactive_to_dormat NUMBER,
--     inactive_fee VARCHAR2(50),
--     interest_method_cr VARCHAR2(50),
--     to_balance_date NUMBER,
--     no_of_nominees_allowed NUMBER,
--     statement_frequency1 VARCHAR2(50),
--     statement_frequency2 VARCHAR2(50),
--     statement_frequency3 VARCHAR2(50),
--     statement_frequency4 VARCHAR2(50),
--     statement_frequency5 VARCHAR2(50),
--     statement_frequency6 VARCHAR2(50),
--     inactive_frequency_code1 VARCHAR2(50),
--     inactive_frequency_code2 VARCHAR2(50),
--     inactive_frequency_code3 VARCHAR2(50),
--     inactive_frequency_code4 VARCHAR2(50),
--     inactive_frequency_code5 VARCHAR2(50),
--     special_savings_ac_subcategory VARCHAR2(50),
--     closure_notice_period_month VARCHAR2(10),
--     closure_notice_period_day VARCHAR2(10),
--     max_withdrawal_amt_without_notice NUMBER,
--     created_date DATE DEFAULT SYSDATE
-- );




-- Create table for Interest tab
CREATE TABLE interest_tab (
    interest_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    transaction_code VARCHAR2(50) NOT NULL,
    amount NUMBER,
    transaction_date DATE,
    description VARCHAR2(200),
    pl_account_ccy VARCHAR2(50),
    interest_payable VARCHAR2(10),
    interest_receivable VARCHAR2(10),
    past_interest_placeholder NUMBER,
    past_due_interest_placeholder NUMBER,
    service_fee VARCHAR2(10),
    pl_normal_interest_paid NUMBER,
    pl_penal_interest_paid NUMBER,
    overdue_interest_payable VARCHAR2(50),
    parking_stop_interest_recalc_dr VARCHAR2(10),
    interest_compounding_freq_dr VARCHAR2(50),
    booking_transaction_script VARCHAR2(200),
    interest_transaction_script VARCHAR2(200),
    interest_calc_freq_dr1 VARCHAR2(50),
    interest_calc_freq_dr2 VARCHAR2(50),
    interest_calc_freq_dr3 VARCHAR2(50),
    interest_calc_freq_dr4 VARCHAR2(50),
    interest_calc_freq_dr5 VARCHAR2(50),
    interest_calc_freq_dr6 VARCHAR2(50),
    interest_options VARCHAR2(200),
    peg_interest_to_ac VARCHAR2(10),
    peg_review_customer VARCHAR2(10),
    debit_compounding_rest VARCHAR2(50),
    transfer_interest_details VARCHAR2(50),
    ac_placeholder1 VARCHAR2(50),
    past_due_interest_placeholder2 NUMBER,
    ac_placeholder2 VARCHAR2(50),
    pl_normal_interest_received NUMBER,
    interest_parking_prior_tax VARCHAR2(50),
    pl_overdue_interest_td NUMBER,
    advance_interest_av VARCHAR2(50),
    stop_interest_recalc_cr VARCHAR2(10),
    credit_interest_compounding_freq VARCHAR2(50),
    interest_calc_freq_cr1 VARCHAR2(50),
    interest_calc_freq_cr2 VARCHAR2(50),
    interest_calc_freq_cr3 VARCHAR2(50),
    interest_calc_freq_cr4 VARCHAR2(50),
    interest_calc_freq_cr5 VARCHAR2(50),
    interest_calc_freq_cr6 VARCHAR2(50),
    modification_of_peg_allowed VARCHAR2(10),
    credit_compounding_rest VARCHAR2(50),
    look_back_period NUMBER,
    created_date DATE DEFAULT SYSDATE
);

-- Create table for Assets tab
CREATE TABLE asset_tab (
    asset_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    past_due_period NUMBER,
    subclassification VARCHAR2(50),
    past_due VARCHAR2(10),
    placeholders_interest_suspense VARCHAR2(50),
    provision_debit VARCHAR2(50),
    record VARCHAR2(10),
    classification_main VARCHAR2(50),
    interest VARCHAR2(50),
    manual VARCHAR2(10),
    placeholders_penal_interest_suspense VARCHAR2(50),
    provision_credit VARCHAR2(50),
    created_date DATE DEFAULT SYSDATE
);

-- ALTER TABLE dormat_tab RENAME COLUMN allow TO allow_data;



-- select * from dormat_tab;


CREATE TABLE dormat_tab (
    dormat_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    no_of_withdrawals NUMBER,
    min_balance_with_cheque NUMBER,
    ledger_folio_fee NUMBER,
    inactive_ac_abnormal_transaction_limit NUMBER,
    duration_to_mark_as_inactive NUMBER,
    dormat_fee NUMBER,  -- changed from VARCHAR2
    interest_method_dr VARCHAR2(10),
    from_balance_date NUMBER,
    ac_statement VARCHAR2(10),
    allow_type VARCHAR2(50), -- renamed from allow
    dormat_frequency_code1 VARCHAR2(20),
    dormat_frequency_code2 VARCHAR2(20),
    dormat_frequency_code3 VARCHAR2(20),
    dormat_frequency_code4 VARCHAR2(20),
    dormat_frequency_code5 VARCHAR2(20),
    special_savings_scheme VARCHAR2(50),
    withdrawal_notice_period_month VARCHAR2(10),
    withdrawal_notice_period_day VARCHAR2(10),
    max_no_of_withdrawals_without_notice NUMBER,
    withdrawal_frequency NUMBER,
    no_interest_if_withdrawals_exceed VARCHAR2(10),
    debit_balance_limit NUMBER,
    fee_or_extra_withdrawal NUMBER,
    dormat_ac_abnormal_transaction_limit NUMBER,
    duration_from_inactive_to_dormat NUMBER,
    inactive_fee NUMBER, -- changed from VARCHAR2
    interest_method_cr VARCHAR2(10),
    to_balance_date NUMBER,
    no_of_nominees_allowed NUMBER,
    statement_frequency1 VARCHAR2(10),
    statement_frequency2 VARCHAR2(10),
    statement_frequency3 VARCHAR2(10),
    statement_frequency4 VARCHAR2(10),
    statement_frequency5 VARCHAR2(10),
    statement_frequency6 VARCHAR2(10),
    inactive_frequency_code1 VARCHAR2(20),
    inactive_frequency_code2 VARCHAR2(20),
    inactive_frequency_code3 VARCHAR2(20),
    inactive_frequency_code4 VARCHAR2(20),
    inactive_frequency_code5 VARCHAR2(20),
    special_savings_ac_subcategory VARCHAR2(50),
    closure_notice_period_month VARCHAR2(10),
    closure_notice_period_day VARCHAR2(10),
    max_withdrawal_amt_without_notice NUMBER,
    created_date DATE DEFAULT SYSDATE
);

select * from DORMAT_TAB;














