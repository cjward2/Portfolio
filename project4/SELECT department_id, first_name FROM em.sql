SELECT department_id, first_name FROM employees;
SELECT department_id FROM employees;
SELECT DISTINCT department_id FROM employees;
SELECT DISTINCT department_id, manager_id FROM employees;

SELECT first_name, job_id, salary, commission_pct FROM employees
WHERE commission_pct is null;

SELECT  department_id = 80 FROM employees;