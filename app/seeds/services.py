from app.models import db, Service


def seed_services():
    s1 = Service(billing_code=771,
                 cpt_code="0001A",
                 service_description="ADM SARSCOV2 30MCG/0.3ML 1ST",
                 list_price=180.00,
                 discounted_price=40.00,
                 hospital_id=1,
                 domain="virology",
                 subdomain="covid",
                 status="proposed"
                 )
    s2 = Service(billing_code=310,
                 cpt_code="0224U",
                 service_description="COVID19 ANTIBODY MULT W/TITER",
                 list_price=240.00,
                 discounted_price=42.13,
                 hospital_id=1,
                 domain="virology",
                 subdomain="covid",
                 status="proposed")
    s3 = Service(billing_code=450,
                 cpt_code="25680",
                 service_description="WRIST FRACTURE W/MANIP",
                 list_price=750.00,
                 discounted_price=249.98,
                 hospital_id=1,
                 domain="testing",
                 subdomain="viral",
                 status="proposed")
    s4 = Service(billing_code=510,
                 cpt_code="29130",
                 service_description="APPLY FINGER SPLINT STATIC ",
                 list_price=310.00,
                 discounted_price=135.73,
                 hospital_id=1,
                 domain="testing",
                 subdomain="viral",
                 status="proposed")

    s5 = Service(billing_code=301,
                 cpt_code="86769",
                 service_description="COVID19 ANTIBODY MULTI STEP",
                 list_price=190.00,
                 discounted_price=0.00,
                 hospital_id=1,
                 domain="virology",
                 subdomain="covid",
                 status="proposed")
    s6 = Service(billing_code=300,
                 cpt_code="C9803",
                 service_description="SPECIMEN COLLEC COVID19 ASMT",
                 list_price=275.00,
                 discounted_price=29.91,
                 hospital_id=1,
                 domain="virology",
                 subdomain="covid",
                 status="proposed")
    s7 = Service(billing_code=306,
                 cpt_code="U0005",
                 service_description="COVID DETECT AMP PROBE ADD-ON",
                 list_price=35.00,
                 discounted_price=0.00,
                 hospital_id=1,
                 domain="virology",
                 subdomain="covid",
                 status="proposed")

    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)
    db.session.add(s6)
    db.session.add(s7)
    db.session.commit()


def undo_services():
    db.session.execute('TRUNCATE services RESTART IDENTITY CASCADE;')
    db.session.commit()
