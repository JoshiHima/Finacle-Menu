const oracledb = require('oracledb');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://172.16.20.4:8080',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

const dbConfig = {
    user: "system",
    password: "himanshuoracle",
    connectString: "localhost:1521/xe"
};

// ========== Save Function Tab ==========
app.post('/api/save-function', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        const { function_type, scheme_code, product_id, scheme_type } = req.body;
        await conn.execute(
            'INSERT INTO function_tab (function_type, scheme_code, product_id, scheme_type) VALUES (:1, :2, :3, :4)',
            [function_type, scheme_code, product_id, scheme_type],
            { autoCommit: true }
        );
        res.json({ message: 'Function data saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// ========== Save Scheme Tab ==========
app.post('/api/save-scheme', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        const data = req.body;
        console.log("Received Scheme Data: ", data);
        await conn.execute(
            `INSERT INTO scheme_tab (
                set_id, nature_of_scheme, additional_calendar_base, expiry_date,
                transaction_restriction, ac_id_generation, sequence, min_posting_work_class,
                product_concept, scheme_supervisor_id, ac_details, product_eligibility_criteria,
                min_age, language_preference, preferred_language_code, product_type,
                effective_date, scheme_name, short_name, ac_prefix, nonresident,
                product_group, pd_general_ledger_subhead, transaction_details, max_age,
                scheme_name_preferred, scheme_short_name_preferred
            ) VALUES (
                :set_id, :nature_of_scheme, :additional_calendar_base, TO_DATE(:expiry_date, 'MM-DD-YYYY'),
                :transaction_restriction, :ac_id_generation, :sequence, :min_posting_work_class,
                :product_concept, :scheme_supervisor_id, :ac_details, :product_eligibility_criteria,
                :min_age, :language_preference, :preferred_language_code, :product_type,
                TO_DATE(:effective_date, 'MM-DD-YYYY'), :scheme_name, :short_name, :ac_prefix, :nonresident,
                :product_group, :pd_general_ledger_subhead, :transaction_details, :max_age,
                :scheme_name_preferred, :scheme_short_name_preferred
            )`,
            data,
            { autoCommit: true }
        );
        res.json({ message: 'Scheme data saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// ========== Save Dormat Tab ==========
// app.post('/api/save-dormat', async (req, res) => {
//     let conn;
//     try {
//         conn = await oracledb.getConnection(dbConfig);
//         const data = req.body;
//         console.log("Received Dormat Data: ", data);
//         await conn.execute(
//             `INSERT INTO dormat_tab (
//                 no_of_withdrawals, min_balance_with_cheque, ledger_folio_fee,
//                 inactive_ac_abnormal_transaction_limit, duration_to_mark_as_inactive, dormat_fee,
//                 interest_method_dr, from_balance_date, ac_statement, dormat_frequency_code1,
//                 dormat_frequency_code2, dormat_frequency_code3, dormat_frequency_code4,
//                 dormat_frequency_code5, special_savings_scheme, withdrawal_notice_period_month,
//                 withdrawal_notice_period_day, max_no_of_withdrawals_without_notice,
//                 withdrawal_frequency, no_interest_if_withdrawals_exceed, debit_balance_limit,
//                 fee_or_extra_withdrawal, dormat_ac_abnormal_transaction_limit,
//                 duration_from_inactive_to_dormat, inactive_fee, interest_method_cr,
//                 to_balance_date, no_of_nominees_allowed, statement_frequency1, statement_frequency2,
//                 statement_frequency3, statement_frequency4, statement_frequency5,
//                 statement_frequency6, inactive_frequency_code1, inactive_frequency_code2,
//                 inactive_frequency_code3, inactive_frequency_code4, inactive_frequency_code5,
//                 special_savings_ac_subcategory, closure_notice_period_month,
//                 closure_notice_period_day, max_withdrawal_amt_without_notice
//             ) VALUES (
//                 :no_of_withdrawals, :min_balance_with_cheque, :ledger_folio_fee,
//                 :inactive_ac_abnormal_transaction_limit, :duration_to_mark_as_inactive, :dormat_fee,
//                 :interest_method_dr, :from_balance_date, :ac_statement, :dormat_frequency_code1,
//                 :dormat_frequency_code2, :dormat_frequency_code3, :dormat_frequency_code4,
//                 :dormat_frequency_code5, :special_savings_scheme, :withdrawal_notice_period_month,
//                 :withdrawal_notice_period_day, :max_no_of_withdrawals_without_notice,
//                 :withdrawal_frequency, :no_interest_if_withdrawals_exceed, :debit_balance_limit,
//                 :fee_or_extra_withdrawal, :dormat_ac_abnormal_transaction_limit,
//                 :duration_from_inactive_to_dormat, :inactive_fee, :interest_method_cr,
//                 :to_balance_date, :no_of_nominees_allowed, :statement_frequency1, :statement_frequency2,
//                 :statement_frequency3, :statement_frequency4, :statement_frequency5,
//                 :statement_frequency6, :inactive_frequency_code1, :inactive_frequency_code2,
//                 :inactive_frequency_code3, :inactive_frequency_code4, :inactive_frequency_code5,
//                 :special_savings_ac_subcategory, :closure_notice_period_month,
//                 :closure_notice_period_day, :max_withdrawal_amt_without_notice
//             )`,
//             data,
//             { autoCommit: true }
//         );
//         res.json({ message: 'Dormat data saved successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     } finally {
//         if (conn) await conn.close();
//     }
// });

app.post('/api/save-dormat', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        const d = req.body;

        // Convert numeric strings to numbers
        const data = {
            no_of_withdrawals: Number(d.no_of_withdrawals),
            min_balance_with_cheque: Number(d.min_balance_with_cheque),
            ledger_folio_fee: Number(d.ledger_folio_fee),
            inactive_ac_abnormal_transaction_limit: Number(d.inactive_ac_abnormal_transaction_limit),
            duration_to_mark_as_inactive: Number(d.duration_to_mark_as_inactive),
            dormat_fee: Number(d.dormat_fee),
            interest_method_dr: d.interest_method_dr,
            from_balance_date: Number(d.from_balance_date),
            ac_statement: d.ac_statement,
            allow_type: d.allow,   // 👈 added mapping
            dormat_frequency_code1: d.dormat_frequency_code1,
            dormat_frequency_code2: d.dormat_frequency_code2,
            dormat_frequency_code3: d.dormat_frequency_code3,
            dormat_frequency_code4: d.dormat_frequency_code4,
            dormat_frequency_code5: d.dormat_frequency_code5,
            special_savings_scheme: d.special_savings_scheme,
            withdrawal_notice_period_month: d.withdrawal_notice_period_month,
            withdrawal_notice_period_day: d.withdrawal_notice_period_day,
            max_no_of_withdrawals_without_notice: Number(d.max_no_of_withdrawals_without_notice),
            withdrawal_frequency: Number(d.withdrawal_frequency),
            no_interest_if_withdrawals_exceed: d.no_interest_if_withdrawals_exceed,
            debit_balance_limit: Number(d.debit_balance_limit),
            fee_or_extra_withdrawal: Number(d.fee_or_extra_withdrawal),
            dormat_ac_abnormal_transaction_limit: Number(d.dormat_ac_abnormal_transaction_limit),
            duration_from_inactive_to_dormat: Number(d.duration_from_inactive_to_dormat),
            inactive_fee: Number(d.inactive_fee),
            interest_method_cr: d.interest_method_cr,
            to_balance_date: Number(d.to_balance_date),
            no_of_nominees_allowed: Number(d.no_of_nominees_allowed),
            statement_frequency1: d.statement_frequency1,
            statement_frequency2: d.statement_frequency2,
            statement_frequency3: d.statement_frequency3,
            statement_frequency4: d.statement_frequency4,
            statement_frequency5: d.statement_frequency5,
            statement_frequency6: d.statement_frequency6,
            inactive_frequency_code1: d.inactive_frequency_code1,
            inactive_frequency_code2: d.inactive_frequency_code2,
            inactive_frequency_code3: d.inactive_frequency_code3,
            inactive_frequency_code4: d.inactive_frequency_code4,
            inactive_frequency_code5: d.inactive_frequency_code5,
            special_savings_ac_subcategory: d.special_savings_ac_subcategory,
            closure_notice_period_month: d.closure_notice_period_month,
            closure_notice_period_day: d.closure_notice_period_day,
            max_withdrawal_amt_without_notice: Number(d.max_withdrawal_amt_without_notice)
        };
        console.log("Dormat Data to be Inserted: ", data);

        await conn.execute(
            `INSERT INTO dormat_tab (
                no_of_withdrawals, min_balance_with_cheque, ledger_folio_fee,
                inactive_ac_abnormal_transaction_limit, duration_to_mark_as_inactive, dormat_fee,
                interest_method_dr, from_balance_date, ac_statement, allow_type,  -- 👈 added here
                dormat_frequency_code1, dormat_frequency_code2, dormat_frequency_code3,
                dormat_frequency_code4, dormat_frequency_code5, special_savings_scheme,
                withdrawal_notice_period_month, withdrawal_notice_period_day,
                max_no_of_withdrawals_without_notice, withdrawal_frequency,
                no_interest_if_withdrawals_exceed, debit_balance_limit, fee_or_extra_withdrawal,
                dormat_ac_abnormal_transaction_limit, duration_from_inactive_to_dormat, inactive_fee,
                interest_method_cr, to_balance_date, no_of_nominees_allowed,
                statement_frequency1, statement_frequency2, statement_frequency3,
                statement_frequency4, statement_frequency5, statement_frequency6,
                inactive_frequency_code1, inactive_frequency_code2, inactive_frequency_code3,
                inactive_frequency_code4, inactive_frequency_code5, special_savings_ac_subcategory,
                closure_notice_period_month, closure_notice_period_day, max_withdrawal_amt_without_notice
            ) VALUES (
                :no_of_withdrawals, :min_balance_with_cheque, :ledger_folio_fee,
                :inactive_ac_abnormal_transaction_limit, :duration_to_mark_as_inactive, :dormat_fee,
                :interest_method_dr, :from_balance_date, :ac_statement, :allow_type,  -- 👈 added here
                :dormat_frequency_code1, :dormat_frequency_code2, :dormat_frequency_code3,
                :dormat_frequency_code4, :dormat_frequency_code5, :special_savings_scheme,
                :withdrawal_notice_period_month, :withdrawal_notice_period_day,
                :max_no_of_withdrawals_without_notice, :withdrawal_frequency,
                :no_interest_if_withdrawals_exceed, :debit_balance_limit, :fee_or_extra_withdrawal,
                :dormat_ac_abnormal_transaction_limit, :duration_from_inactive_to_dormat, :inactive_fee,
                :interest_method_cr, :to_balance_date, :no_of_nominees_allowed,
                :statement_frequency1, :statement_frequency2, :statement_frequency3,
                :statement_frequency4, :statement_frequency5, :statement_frequency6,
                :inactive_frequency_code1, :inactive_frequency_code2, :inactive_frequency_code3,
                :inactive_frequency_code4, :inactive_frequency_code5, :special_savings_ac_subcategory,
                :closure_notice_period_month, :closure_notice_period_day, :max_withdrawal_amt_without_notice
            )
            `,
            data,
            { autoCommit: true }
        );

        res.json({ message: 'Dormat data saved successfully' });
    } catch (err) {
        console.error("Insert Error:", err);
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});


// ========== Save Interest Tab ==========
app.post('/api/save-interest', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        await conn.execute(
            `INSERT INTO interest_tab (
                transaction_code, amount, transaction_date, description, pl_account_ccy,
                interest_payable, interest_receivable, past_interest_placeholder,
                past_due_interest_placeholder, service_fee, pl_normal_interest_paid,
                pl_penal_interest_paid, overdue_interest_payable, parking_stop_interest_recalc_dr,
                interest_compounding_freq_dr, booking_transaction_script, interest_transaction_script,
                interest_calc_freq_dr1, interest_calc_freq_dr2, interest_calc_freq_dr3,
                interest_calc_freq_dr4, interest_calc_freq_dr5, interest_calc_freq_dr6,
                interest_options, peg_interest_to_ac, peg_review_customer, debit_compounding_rest,
                transfer_interest_details, ac_placeholder1, past_due_interest_placeholder2,
                ac_placeholder2, pl_normal_interest_received, interest_parking_prior_tax,
                pl_overdue_interest_td, advance_interest_av, stop_interest_recalc_cr,
                credit_interest_compounding_freq, interest_calc_freq_cr1, interest_calc_freq_cr2,
                interest_calc_freq_cr3, interest_calc_freq_cr4, interest_calc_freq_cr5,
                interest_calc_freq_cr6, modification_of_peg_allowed, credit_compounding_rest,
                look_back_period
            ) VALUES (
                :transaction_code, :amount, TO_DATE(:transaction_date, 'MM-DD-YYYY'), :description, :pl_account_ccy,
                :interest_payable, :interest_receivable, :past_interest_placeholder,
                :past_due_interest_placeholder, :service_fee, :pl_normal_interest_paid,
                :pl_penal_interest_paid, :overdue_interest_payable, :parking_stop_interest_recalc_dr,
                :interest_compounding_freq_dr, :booking_transaction_script, :interest_transaction_script,
                :interest_calc_freq_dr1, :interest_calc_freq_dr2, :interest_calc_freq_dr3,
                :interest_calc_freq_dr4, :interest_calc_freq_dr5, :interest_calc_freq_dr6,
                :interest_options, :peg_interest_to_ac, :peg_review_customer, :debit_compounding_rest,
                :transfer_interest_details, :ac_placeholder1, :past_due_interest_placeholder2,
                :ac_placeholder2, :pl_normal_interest_received, :interest_parking_prior_tax,
                :pl_overdue_interest_td, :advance_interest_av, :stop_interest_recalc_cr,
                :credit_interest_compounding_freq, :interest_calc_freq_cr1, :interest_calc_freq_cr2,
                :interest_calc_freq_cr3, :interest_calc_freq_cr4, :interest_calc_freq_cr5,
                :interest_calc_freq_cr6, :modification_of_peg_allowed, :credit_compounding_rest,
                :look_back_period
            )`,
            req.body,
            { autoCommit: true }
        );
        res.json({ message: 'Interest data saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// ========== Save Assets Tab ==========
app.post('/api/save-asset', async (req, res) => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
        await conn.execute(
            `INSERT INTO asset_tab (
                past_due_period, subclassification, past_due, placeholders_interest_suspense,
                provision_debit, record, classification_main, interest, manual,
                placeholders_penal_interest_suspense, provision_credit
            ) VALUES (
                :past_due_period, :subclassification, :past_due, :placeholders_interest_suspense,
                :provision_debit, :record, :classification_main, :interest, :manual,
                :placeholders_penal_interest_suspense, :provision_credit
            )`,
            req.body,
            { autoCommit: true }
        );
        res.json({ message: 'Assets data saved successfully' });
    } catch (err) {
        res.status(500).json({ error: err});
    } finally {
        if (conn) await conn.close();
    }
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));
