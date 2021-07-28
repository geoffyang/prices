from app.models import db, Service

def seed_services():
    s1 = Service(billing_code=771,
                 cpt_code="0001A",
                 service_description="ADM SARSCOV2 30MCG/0.3ML 1ST",
                 list_price=180.00,
                 discounted_price=40.00,
                 domain="testing",
                 subdomain="viral",
                 status="proposed"
                 )
    s2 = Service(billing_code=310,
                 cpt_code="0224U",
                 service_description="COVID19 ANTIBODY MULT W/TITER",
                 list_price=240.00,
                 discounted_price=42.13,
                 domain="testing",
                 subdomain="viral",
                 status="proposed")

    db.session.add(s1)
    db.session.add(s2)
    db.session.commit()


def undo_services():
    db.session.execute('TRUNCATE services RESTART IDENTITY CASCADE;')
    db.session.commit()
